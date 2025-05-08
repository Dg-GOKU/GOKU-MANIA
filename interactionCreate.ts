import { DiscordBot } from '../bot';
import { Interaction } from 'discord.js';

export function registerInteractionCreateEvent(bot: DiscordBot): void {
  bot.client.on('interactionCreate', async (interaction: Interaction) => {
    // This is a placeholder for future slash command implementation
    // For now, we're using traditional prefix commands
    
    // In a future update, this could handle slash commands, buttons, select menus, etc.
    if (interaction.isCommand()) {
      // Handle slash commands here when implemented
    }
  });
}
