import { DiscordBot } from '../bot';
import { registerGuildMemberAddEvent } from './guildMemberAdd';
import { registerReadyEvent } from './ready';
import { registerInteractionCreateEvent } from './interactionCreate';

export function registerEvents(bot: DiscordBot): void {
  // Register all event handlers
  registerReadyEvent(bot);
  registerGuildMemberAddEvent(bot);
  registerInteractionCreateEvent(bot);
}
