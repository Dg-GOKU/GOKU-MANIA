import { DiscordBot } from '../bot';
import { Command, commands } from './index';
import { Message, EmbedBuilder } from 'discord.js';

export function registerUtilityCommands(bot: DiscordBot, commands: Map<string, Command>): void {
  // Hello command
  commands.set('hello', {
    name: 'hello',
    description: 'Responds with a friendly greeting and random comments!',
    category: 'utility',
    usage: 'hello',
    examples: ['hello'],
    cooldown: 2,
    execute: async (message: Message) => {
      const greetings = [
        `👋 Hi there, ${message.author}! Hope you are having an amazing day! 🌟`,
        `✨ Hello, ${message.author}! Welcome to the server! 😊`,
        `💖 Hey, ${message.author}! Glad to see you around! 💬`,
        `🌈 Hiya, ${message.author}! Ready to have some fun? 🎉`
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      const embed = new EmbedBuilder()
        .setColor(0x5865F2) // Discord blurple color
        .setTitle('Hello! 🎉')
        .setDescription(randomGreeting)
        .setFooter({ text: 'Remember, you are awesome! 😄' });

      return message.reply({ embeds: [embed] });
    }
  });
  // Help command
  commands.set('help', {
    name: 'help',
    description: 'Displays a list of commands or detailed help for a specific command.',
    category: 'utility',
    usage: 'help [command]',
    examples: ['help ban'],
    cooldown: 3,
    execute: async (message: Message, args: string[]) => {
      const prefix = message.guild ? bot.getPrefix(message.guild.id) : '!';
      
      // If no command specified, show a list of all commands
      if (!args.length) {
        const commandsMap = new Map<string, Command[]>();
        
        // Group commands by category
        Array.from(commands.values()).forEach(command => {
          if (!commandsMap.has(command.category)) {
            commandsMap.set(command.category, []);
          }
          commandsMap.get(command.category)!.push(command);
        });
        
        // Create embed
        const embed = new EmbedBuilder()
          .setTitle('Bot Commands')
          .setColor(0x5865F2) // Discord blurple color
          .setDescription(`Use \`${prefix}help [command]\` to get detailed info about a specific command.`)
          .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        
        // Add fields for each category
        commandsMap.forEach((categoryCommands, category) => {
          const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
          const commandList = categoryCommands.map((cmd: Command) => `\`${cmd.name}\``).join(', ');
          
          embed.addFields({ name: categoryTitle, value: commandList });
        });
        
        return message.reply({ embeds: [embed] });
      }
      
      // Show help for a specific command
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName);
      
      if (!command) {
        return message.reply(`No command found with name \`${commandName}\``);
      }
      
      const embed = new EmbedBuilder()
        .setTitle(`Command: ${prefix}${command.name}`)
        .setColor(0x5865F2) // Discord blurple color
        .setDescription(command.description)
        .addFields(
          { name: 'Usage', value: `\`${prefix}${command.usage}\`` },
          { name: 'Category', value: command.category.charAt(0).toUpperCase() + command.category.slice(1) },
          { name: 'Cooldown', value: `${command.cooldown} seconds` }
        )
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
      
      if (command.permissions) {
        embed.addFields({ name: 'Required Permission', value: command.permissions });
      }
      
      if (command.examples && command.examples.length > 0) {
        const examples = command.examples.map(ex => `\`${prefix}${ex}\``).join('\n');
        embed.addFields({ name: 'Examples', value: examples });
      }
      
      return message.reply({ embeds: [embed] });
    }
  });

  
  // Server info command
  commands.set('serverinfo', {
    name: 'serverinfo',
    description: 'Displays information about the current server.',
    category: 'utility',
    usage: 'serverinfo',
    examples: ['serverinfo'],
    cooldown: 5,
    execute: async (message: Message) => {
      // Check if command was used in a guild
      if (!message.guild) {
        return message.reply('This command can only be used in a server.');
      }
      
      // Fetch guild to ensure we have up-to-date info
      const guild = await message.guild.fetch();
      
      // Get member count
      const totalMembers = guild.memberCount;
      const onlineMembers = guild.members.cache.filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd').size;
      
      // Get channel counts
      const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size;
      const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size;
      const categoryChannels = guild.channels.cache.filter(channel => channel.type === 4).size;
      
      // Get role count
      const roleCount = guild.roles.cache.size - 1; // -1 to exclude @everyone
      
      // Create embed
      const embed = new EmbedBuilder()
        .setTitle('Server Information')
        .setColor(0x5865F2) // Discord blurple color
        .setThumbnail(guild.iconURL() || '')
        .addFields(
          { name: 'Name', value: guild.name, inline: true },
          { name: 'ID', value: guild.id, inline: true },
          { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
          { name: 'Created On', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
          { name: 'Members', value: `${totalMembers} total\n${onlineMembers} online`, inline: true },
          { name: 'Channels', value: `${textChannels} text\n${voiceChannels} voice\n${categoryChannels} categories`, inline: true },
          { name: 'Roles', value: roleCount.toString(), inline: true },
          { name: 'Boost Level', value: `Level ${guild.premiumTier}`, inline: true },
          { name: 'Boosts', value: guild.premiumSubscriptionCount?.toString() || '0', inline: true }
        );
      
      if (guild.description) {
        embed.setDescription(guild.description);
      }
      
      if (guild.bannerURL()) {
        embed.setImage(guild.bannerURL() || '');
      }
      
      return message.reply({ embeds: [embed] });
    }
  });
  
  // Welcome configuration command
  commands.set('welcome', {
    name: 'welcome',
    description: 'Configure welcome message settings for the server.',
    category: 'utility',
    usage: 'welcome [enable|disable|channel|message] [value]',
    examples: [
      'welcome enable', 
      'welcome disable', 
      'welcome channel #welcome', 
      'welcome message Hey {user}, welcome to {server}! Enjoy your stay!'
    ],
    permissions: 'MANAGE_GUILD',
    cooldown: 5,
    execute: async (message: Message, args: string[]) => {
      // Check if command was used in a guild
      if (!message.guild) {
        return message.reply('This command can only be used in a server.');
      }
      
      // Check if user has permission
      if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('You need the `Manage Server` permission to use this command.');
      }
      
      // Get guild settings
      const guildSettings = await bot.storage.getGuildSettings(message.guild.id);
      
      if (!guildSettings) {
        return message.reply('Could not find guild settings. Please contact the bot developer.');
      }
      
      // If no arguments, show current settings
      if (!args.length) {
        const welcomeChannel = guildSettings.welcomeChannelId 
          ? message.guild.channels.cache.get(guildSettings.welcomeChannelId) 
          : null;
          
        const embed = new EmbedBuilder()
          .setTitle('🎉 Welcome Message Settings')
          .setColor(0x5865F2)
          .addFields(
            { name: '✅ Status', value: guildSettings.welcomeEnabled ? 'Enabled' : 'Disabled', inline: true },
            { name: '📢 Channel', value: welcomeChannel ? `<#${welcomeChannel.id}>` : 'Not set', inline: true },
            { name: '💬 Message', value: guildSettings.welcomeMessage || 'Default message', inline: false }
          )
          .setFooter({ text: 'Use $welcome [enable|disable|channel|message] to configure' });
          
        return message.reply({ embeds: [embed] });
      }
      
      const subCommand = args[0].toLowerCase();
      
      // Enable welcome messages
      if (subCommand === 'enable') {
        const updatedSettings = await bot.storage.updateGuildSettings(message.guild.id, {
          welcomeEnabled: true
        });
        
        if (!updatedSettings) {
          return message.reply('Failed to update settings.');
        }
        
        // Update bot's cache
        bot.updateGuildSettings(message.guild.id, updatedSettings);
        
        return message.reply('✅ Welcome messages have been **enabled**!');
      }
      
      // Disable welcome messages
      if (subCommand === 'disable') {
        const updatedSettings = await bot.storage.updateGuildSettings(message.guild.id, {
          welcomeEnabled: false
        });
        
        if (!updatedSettings) {
          return message.reply('Failed to update settings.');
        }
        
        // Update bot's cache
        bot.updateGuildSettings(message.guild.id, updatedSettings);
        
        return message.reply('✅ Welcome messages have been **disabled**!');
      }
      
      // Set welcome channel
      if (subCommand === 'channel') {
        // Check if channel was mentioned
        const channel = message.mentions.channels.first();
        
        if (!channel) {
          return message.reply('Please mention a valid text channel.');
        }
        
        if (!channel.isTextBased()) {
          return message.reply('The welcome channel must be a text channel.');
        }
        
        const updatedSettings = await bot.storage.updateGuildSettings(message.guild.id, {
          welcomeChannelId: channel.id
        });
        
        if (!updatedSettings) {
          return message.reply('Failed to update settings.');
        }
        
        // Update bot's cache
        bot.updateGuildSettings(message.guild.id, updatedSettings);
        
        return message.reply(`✅ Welcome channel set to <#${channel.id}>!`);
      }
      
      // Set welcome message
      if (subCommand === 'message') {
        if (args.length < 2) {
          return message.reply('Please provide a welcome message. You can use `{user}` to mention the new member, `{server}` for server name, and `{memberCount}` for the member count.');
        }
        
        // Get the message (everything after the first argument)
        const welcomeMessage = args.slice(1).join(' ');
        
        // Check if message is too long
        if (welcomeMessage.length > 1000) {
          return message.reply('Welcome message is too long. Please keep it under 1000 characters.');
        }
        
        const updatedSettings = await bot.storage.updateGuildSettings(message.guild.id, {
          welcomeMessage
        });
        
        if (!updatedSettings) {
          return message.reply('Failed to update settings.');
        }
        
        // Update bot's cache
        bot.updateGuildSettings(message.guild.id, updatedSettings);
        
        // Show a preview of the message with variables replaced
        const previewMessage = welcomeMessage
          .replace(/{user}/g, `@${message.author.username}`)
          .replace(/{server}/g, message.guild.name)
          .replace(/{memberCount}/g, message.guild.memberCount.toString());
        
        const embed = new EmbedBuilder()
          .setTitle('✅ Welcome Message Updated')
          .setColor(0x5865F2)
          .setDescription('Your welcome message has been updated.')
          .addFields(
            { name: '📝 Preview', value: previewMessage }
          )
          .setFooter({ text: 'Variables will be replaced when a new member joins.' });
        
        return message.reply({ embeds: [embed] });
      }
      
      // Invalid subcommand
      return message.reply('Invalid option. Use `enable`, `disable`, `channel`, or `message`.');
    }
  });
  
  // User info command
  commands.set('userinfo', {
    name: 'userinfo',
    description: 'Displays information about a specific user.',
    category: 'utility',
    usage: 'userinfo [@user]',
    examples: ['userinfo @User123'],
    cooldown: 5,
    execute: async (message: Message) => {
      // Get the target user - either mentioned user or the command author
      const target = message.mentions.users.first() || message.author;
      
      // Get member object if in a guild
      const member = message.guild ? message.guild.members.cache.get(target.id) : null;
      
      // Create embed
      const embed = new EmbedBuilder()
        .setTitle('User Information')
        .setColor(member?.displayHexColor || 0x5865F2)
        .setThumbnail(target.displayAvatarURL())
        .addFields(
          { name: 'Username', value: target.tag, inline: true },
          { name: 'ID', value: target.id, inline: true },
          { name: 'Account Created', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:F>`, inline: false }
        );
      
      // If we have a guild member, add more info
      if (member) {
        embed.addFields(
          { name: 'Nickname', value: member.nickname || 'None', inline: true },
          { name: 'Joined Server', value: member.joinedAt ? `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:F>` : 'Unknown', inline: false },
          { name: 'Roles', value: member.roles.cache.size > 1 ? 
              member.roles.cache
                .filter(role => role.id !== message.guild!.id) // Filter out @everyone
                .sort((a, b) => b.position - a.position) // Sort by position (highest first)
                .map(role => `<@&${role.id}>`)
                .join(', ') 
              : 'None' 
          }
        );
      }
      
      return message.reply({ embeds: [embed] });
    }
  });
  
  // Test welcome message command
  commands.set('testwelcome', {
    name: 'testwelcome',
    description: 'Tests the welcome message for new members.',
    category: 'utility',
    usage: 'testwelcome [@user]',
    examples: ['testwelcome', 'testwelcome @User123'],
    permissions: 'MANAGE_GUILD',
    cooldown: 5,
    execute: async (message: Message) => {
      // Check if command was used in a guild
      if (!message.guild) {
        return message.reply('This command can only be used in a server.');
      }
      
      // Check if user has permission
      if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('You need the `Manage Server` permission to use this command.');
      }
      
      // Get guild settings
      const guildSettings = await bot.storage.getGuildSettings(message.guild.id);
      
      if (!guildSettings) {
        return message.reply('Could not find guild settings. Please contact the bot developer.');
      }
      
      // Get the target user - either mentioned user or the command author
      const target = message.mentions.users.first() || message.author;
      
      // Create a fake member join event
      const member = message.guild.members.cache.get(target.id);
      
      if (!member) {
        return message.reply('Could not find member in the server.');
      }
      
      try {
        // Parse welcome message template
        const welcomeMessage = guildSettings.welcomeMessage
          .replace(/{user}/g, `<@${member.id}>`)
          .replace(/{server}/g, message.guild.name)
          .replace(/{memberCount}/g, message.guild.memberCount.toString());
        
        // Create welcome embed with cool emojis
        const embed = new EmbedBuilder()
          .setColor(0x5865F2) // Discord blurple color
          .setTitle(`🎉 Welcome to ${message.guild.name}! 🎊`)
          .setDescription(`${welcomeMessage}\n\n✨ **We're excited to have you here!** ✨`)
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .addFields(
            { name: '🔹 Server Rules', value: 'Please check out <#rules> to get started!', inline: false },
            { name: '🔹 Get Roles', value: 'Visit <#roles> to select your roles and customize your experience!', inline: false },
            { name: '🔹 Need Help?', value: 'Feel free to ask in <#help> if you have any questions!', inline: false }
          )
          .setFooter({ text: `🌟 Member #${message.guild.memberCount} 🌟` });
        
        // Send test welcome message
        await message.reply({ 
          content: '**📝 Test Welcome Message Preview:**',
          embeds: [embed] 
        });
      } catch (error) {
        console.error('Error testing welcome message:', error);
        message.reply('An error occurred while testing the welcome message.');
      }
    }
  });
}
