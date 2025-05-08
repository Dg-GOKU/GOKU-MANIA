import { DiscordBot } from '../bot';
import { ActivityType } from 'discord.js';

export function registerReadyEvent(bot: DiscordBot): void {
  bot.client.once('ready', async () => {
    const client = bot.client;
    
    if (!client.user) {
      console.error('Client user is null, something went wrong during login');
      return;
    }
    
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Set bot activity
    client.user.setActivity('!help', { type: ActivityType.Listening });
    
    // Load guild settings
    await bot.loadGuildSettings();
    
    // Mark bot as ready
    bot.setReady(true);
    
    // Log some stats
    console.log(`Bot is ready! Serving ${client.guilds.cache.size} guilds.`);
  });
}
