import { DiscordBot } from '../bot';
import { Command } from './index';
import { Message, GuildMember, PermissionsBitField, TextChannel } from 'discord.js';

export function registerModerationCommands(bot: DiscordBot, commands: Map<string, Command>): void {
  // Kick command
  commands.set('kick', {
    name: 'kick',
    description: 'Kicks a member from the server with an optional reason.',
    category: 'moderation',
    usage: 'kick @user [reason]',
    permissions: 'KickMembers',
    examples: ['kick @JohnDoe Spamming in general chat'],
    cooldown: 5,
    execute: async (message: Message, args: string[]) => {
      // Check if the bot has permission to kick members
      if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return message.reply('I need the `Kick Members` permission to execute this command.');
      }
      
      // Check if a user was mentioned
      const member = message.mentions.members?.first();
      if (!member) {
        return message.reply('Please mention a member to kick.');
      }
      
      // Check if the bot can kick the member
      if (!member.kickable) {
        return message.reply('I cannot kick this member. They may have higher permissions than me.');
      }
      
      // Get the reason for the kick
      const reason = args.slice(1).join(' ') || 'No reason provided';
      
      try {
        await member.kick(reason);
        message.reply(`Successfully kicked ${member.user.tag} for: ${reason}`);
      } catch (error) {
        message.reply(`Failed to kick ${member.user.tag}: ${(error as Error).message}`);
      }
    }
  });
  
  // Ban command
  commands.set('ban', {
    name: 'ban',
    description: 'Permanently bans a member from the server with an optional reason.',
    category: 'moderation',
    usage: 'ban @user [reason]',
    permissions: 'BanMembers',
    examples: ['ban @JaneDoe Inappropriate behavior'],
    cooldown: 5,
    execute: async (message: Message, args: string[]) => {
      // Check if the bot has permission to ban members
      if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return message.reply('I need the `Ban Members` permission to execute this command.');
      }
      
      // Check if a user was mentioned
      const member = message.mentions.members?.first();
      if (!member) {
        return message.reply('Please mention a member to ban.');
      }
      
      // Check if the bot can ban the member
      if (!member.bannable) {
        return message.reply('I cannot ban this member. They may have higher permissions than me.');
      }
      
      // Get the reason for the ban
      const reason = args.slice(1).join(' ') || 'No reason provided';
      
      try {
        await member.ban({ reason });
        message.reply(`Successfully banned ${member.user.tag} for: ${reason}`);
      } catch (error) {
        message.reply(`Failed to ban ${member.user.tag}: ${(error as Error).message}`);
      }
    }
  });
  
  // Timeout command
  commands.set('timeout', {
    name: 'timeout',
    description: 'Times out a member for a specified duration (max 28 days).',
    category: 'moderation',
    usage: 'timeout @user duration [reason]',
    permissions: 'ModerateMembers',
    examples: ['timeout @User123 1h Cool down period'],
    cooldown: 5,
    execute: async (message: Message, args: string[]) => {
      // Check if the bot has permission to moderate members
      if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        return message.reply('I need the `Moderate Members` permission to execute this command.');
      }
      
      // Check if a user was mentioned
      const member = message.mentions.members?.first();
      if (!member) {
        return message.reply('Please mention a member to timeout.');
      }
      
      // Check if the bot can timeout the member
      if (!member.moderatable) {
        return message.reply('I cannot timeout this member. They may have higher permissions than me.');
      }
      
      // Check if a duration was provided
      if (!args[1]) {
        return message.reply('Please specify a duration for the timeout (e.g., 1m, 1h, 1d).');
      }
      
      // Parse the duration
      const durationString = args[1].toLowerCase();
      let duration = 0;
      
      if (durationString.endsWith('m')) {
        duration = parseInt(durationString) * 60 * 1000; // minutes to ms
      } else if (durationString.endsWith('h')) {
        duration = parseInt(durationString) * 60 * 60 * 1000; // hours to ms
      } else if (durationString.endsWith('d')) {
        duration = parseInt(durationString) * 24 * 60 * 60 * 1000; // days to ms
      } else {
        return message.reply('Invalid duration format. Use m for minutes, h for hours, or d for days (e.g., 10m, 1h, 1d).');
      }
      
      // Check if duration is valid
      if (isNaN(duration) || duration <= 0) {
        return message.reply('Duration must be a positive number.');
      }
      
      // Limit duration to 28 days (Discord's maximum timeout)
      const maxTimeout = 28 * 24 * 60 * 60 * 1000; // 28 days in ms
      if (duration > maxTimeout) {
        duration = maxTimeout;
        message.reply('Timeout duration limited to 28 days (Discord maximum).');
      }
      
      // Get the reason for the timeout
      const reason = args.slice(2).join(' ') || 'No reason provided';
      
      try {
        await member.timeout(duration, reason);
        
        // Convert duration to readable format
        let timeString = '';
        if (duration >= 24 * 60 * 60 * 1000) {
          const days = Math.floor(duration / (24 * 60 * 60 * 1000));
          timeString += `${days} day${days > 1 ? 's' : ''} `;
          duration %= 24 * 60 * 60 * 1000;
        }
        if (duration >= 60 * 60 * 1000) {
          const hours = Math.floor(duration / (60 * 60 * 1000));
          timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
          duration %= 60 * 60 * 1000;
        }
        if (duration >= 60 * 1000) {
          const minutes = Math.floor(duration / (60 * 1000));
          timeString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        
        message.reply(`Successfully timed out ${member.user.tag} for ${timeString.trim()}. Reason: ${reason}`);
      } catch (error) {
        message.reply(`Failed to timeout ${member.user.tag}: ${(error as Error).message}`);
      }
    }
  });
  
  // Purge command
  commands.set('purge', {
    name: 'purge',
    description: 'Deletes a specified amount of messages from the channel.',
    category: 'moderation',
    usage: 'purge amount [user]',
    permissions: 'ManageMessages',
    examples: ['purge 10'],
    cooldown: 5,
    execute: async (message: Message, args: string[]) => {
      // Check if the bot has permission to manage messages
      if (!message.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        return message.reply('I need the `Manage Messages` permission to execute this command.');
      }
      
      // Check if an amount was provided
      if (!args[0]) {
        return message.reply('Please specify the number of messages to delete.');
      }
      
      const amount = parseInt(args[0]);
      
      // Validate the amount
      if (isNaN(amount) || amount <= 0 || amount > 100) {
        return message.reply('Please provide a number between 1 and 100.');
      }
      
      // Check if the channel is a text channel
      if (!message.channel.isTextBased() || !('bulkDelete' in message.channel)) {
        return message.reply('Can only purge messages in text channels.');
      }
      
      const channel = message.channel as TextChannel;
      
      try {
        // If a user is mentioned, delete only their messages
        if (message.mentions.users.size > 0) {
          const user = message.mentions.users.first()!;
          
          // Fetch more messages than needed to ensure we get enough from the specified user
          const fetchedMessages = await channel.messages.fetch({ limit: Math.min(amount * 5, 100) });
          const userMessages = fetchedMessages.filter(msg => msg.author.id === user.id).first(amount);
          
          if (userMessages.length === 0) {
            return message.reply(`No recent messages from ${user.tag} found.`);
          }
          
          await channel.bulkDelete(userMessages);
          const tempMsg = await message.reply(`Deleted ${userMessages.length} messages from ${user.tag}.`);
          
          // Delete the confirmation message after 3 seconds
          setTimeout(() => tempMsg.delete().catch(() => {}), 3000);
        } else {
          // Delete the specified amount of messages
          await channel.bulkDelete(amount + 1); // +1 to include the command message
          
          const tempMsg = await channel.send(`Deleted ${amount} messages.`);
          
          // Delete the confirmation message after 3 seconds
          setTimeout(() => tempMsg.delete().catch(() => {}), 3000);
        }
      } catch (error) {
        message.reply(`Failed to delete messages: ${(error as Error).message}`);
      }
    }
  });
}
