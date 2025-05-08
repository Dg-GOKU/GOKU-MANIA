import { DiscordBot } from '../bot';
import { GuildMember, EmbedBuilder, TextChannel } from 'discord.js';

export function registerGuildMemberAddEvent(bot: DiscordBot): void {
  bot.client.on('guildMemberAdd', async (member: GuildMember) => {
    try {
      // Get guild settings
      const guildSettings = await bot.storage.getGuildSettings(member.guild.id);
      
      // If welcome messages are disabled or channel not set, don't send a message
      if (!guildSettings || !guildSettings.welcomeEnabled || !guildSettings.welcomeChannelId) {
        return;
      }
      
      // Try to get the welcome channel
      const welcomeChannel = member.guild.channels.cache.get(guildSettings.welcomeChannelId);
      
      // If channel doesn't exist or isn't a text channel, don't send a message
      if (!welcomeChannel || !welcomeChannel.isTextBased()) {
        console.warn(`Welcome channel not found or not a text channel for guild ${member.guild.id}`);
        return;
      }
      
      // Parse welcome message template - schema now defines welcomeMessage as not nullable
      const welcomeMessage = guildSettings.welcomeMessage
        .replace(/{user}/g, `<@${member.id}>`)
        .replace(/{server}/g, member.guild.name)
        .replace(/{memberCount}/g, member.guild.memberCount.toString());
      
      // Create welcome embed with cool emojis
      const embed = new EmbedBuilder()
        .setColor(0x5865F2) // Discord blurple color
        .setTitle(`🎉 Welcome to ${member.guild.name}! 🎊`)
        .setDescription(`${welcomeMessage}\n\n✨ **We're excited to have you here!** ✨`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .addFields(
          { name: '🔹 Server Rules', value: 'Please check out <#rules> to get started!', inline: false },
          { name: '🔹 Get Roles', value: 'Visit <#roles> to select your roles and customize your experience!', inline: false },
          { name: '🔹 Need Help?', value: 'Feel free to ask in <#help> if you have any questions!', inline: false }
        )
        .setFooter({ text: `🌟 Member #${member.guild.memberCount} 🌟` });
      
      // Send welcome message
      await (welcomeChannel as TextChannel).send({ embeds: [embed] });
      
      // Log the event
      await bot.storage.createLog({
        guildId: member.guild.id,
        userId: member.id,
        command: 'guildMemberAdd',
        timestamp: new Date().toISOString(),
        success: true,
      });
    } catch (error) {
      console.error('Error in guildMemberAdd event:', error);
      
      // Log the error
      await bot.storage.createLog({
        guildId: member.guild.id,
        userId: member.id,
        command: 'guildMemberAdd',
        timestamp: new Date().toISOString(),
        success: false,
        errorMessage: (error as Error).message,
      });
    }
  });
}
