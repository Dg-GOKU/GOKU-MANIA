import { DiscordBot } from '../bot';
import { Message, PermissionsBitField, Client } from 'discord.js';
import { registerModerationCommands } from './moderation';
import { registerUtilityCommands } from './utility';
import { registerFunCommands } from './fun';
import { registerMusicCommands } from './music';

// Track user cooldowns
const cooldowns = new Map<string, Map<string, number>>();

// Function to check if a user is on cooldown for a command
function isOnCooldown(userId: string, commandName: string, cooldownSeconds: number): boolean {
  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Map());
  }
  
  const timestamps = cooldowns.get(commandName)!;
  const now = Date.now();
  
  if (timestamps.has(userId)) {
    const expirationTime = timestamps.get(userId)! + cooldownSeconds * 1000;
    
    if (now < expirationTime) {
      return true;
    }
  }
  
  timestamps.set(userId, now);
  return false;
}

// Function to check if a user has the required permissions for a command
function hasPermission(message: Message, permission?: string): boolean {
  if (!permission) return true;
  
  // Convert string permission to PermissionsBitField flag
  const permFlag = PermissionsBitField.Flags[permission as keyof typeof PermissionsBitField.Flags];
  
  return message.member?.permissions.has(permFlag) ?? false;
}

// Define a command handler type
export type CommandHandler = (message: Message, args: string[]) => Promise<any>;

// Define a command type
export interface Command {
  name: string;
  description: string;
  category: string;
  usage: string;
  cooldown: number;
  permissions?: string;
  examples?: string[];
  execute: CommandHandler;
}

// Map to store all registered commands
export const commands = new Map<string, Command>();

// Register all commands
export function registerCommands(bot: DiscordBot): void {
  // Register command categories
  registerModerationCommands(bot, commands);
  registerUtilityCommands(bot, commands);
  registerFunCommands(bot, commands);
  registerMusicCommands(bot, commands);
  
  // Set up message event handler for commands
  bot.client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // Get the appropriate prefix for the guild
    const prefix = message.guild
      ? bot.getPrefix(message.guild.id)
      : '!';
    
    // Check if the message starts with the prefix
    if (!message.content.startsWith(prefix)) return;
    
    // Parse the command name and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    
    if (!commandName) return;
    
    // Check if the command exists
    const command = commands.get(commandName);
    if (!command) return;
    
    // Check permissions
    if (!hasPermission(message, command.permissions)) {
      return message.reply(`You don't have permission to use this command. Required: ${command.permissions}`);
    }
    
    // Check cooldown
    if (isOnCooldown(message.author.id, command.name, command.cooldown)) {
      return message.reply(`Please wait before using the \`${command.name}\` command again.`);
    }
    
    // Execute the command
    try {
      await command.execute(message, args);
      
      // Log command usage in database
      if (message.guild) {
        await bot.storage.createLog({
          guildId: message.guild.id,
          userId: message.author.id,
          command: command.name,
          timestamp: new Date().toISOString(),
          success: true,
        });
      }
    } catch (error) {
      console.error(`Error executing command ${command.name}:`, error);
      message.reply('There was an error executing that command.');
      
      // Log error in database
      if (message.guild) {
        await bot.storage.createLog({
          guildId: message.guild.id,
          userId: message.author.id,
          command: command.name,
          timestamp: new Date().toISOString(),
          success: false,
          errorMessage: (error as Error).message,
        });
      }
    }
  });
}
