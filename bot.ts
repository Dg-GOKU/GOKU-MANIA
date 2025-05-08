import { Client, GatewayIntentBits, Collection, Events, Partials } from 'discord.js';
import { IStorage } from '../storage';
import { GuildSettings } from '@shared/schema';
import { registerEvents } from './events';
import { registerCommands } from './commands';

// Define the Bot class to handle Discord interactions
export class DiscordBot {
  client: Client;
  storage: IStorage;
  private isReady: boolean = false;
  private prefix: string = '$';
  private guildSettings: Map<string, GuildSettings> = new Map();
  
  constructor(storage: IStorage) {
    this.storage = storage;
    
    // Initialize Discord client with necessary intents
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    });
  }
  
  async initialize(): Promise<void> {
    // Register all event handlers
    registerEvents(this);
    
    // Register all commands
    registerCommands(this);
    
    // Log in to Discord with the token from environment variables
    if (!process.env.DISCORD_BOT_TOKEN) {
      console.error('DISCORD_BOT_TOKEN is not defined in the environment variables');
      return;
    }
    
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      console.log('Discord bot logged in');
    } catch (error) {
      console.error('Failed to log in to Discord:', error);
    }
  }
  
  async loadGuildSettings(): Promise<void> {
    try {
      // For each guild the bot is in, load its settings
      this.client.guilds.cache.forEach(async (guild) => {
        let settings = await this.storage.getGuildSettings(guild.id);
        
        // If no settings exist for this guild, create default settings
        if (!settings) {
          settings = await this.storage.createGuildSettings({
            guildId: guild.id,
            prefix: '$',
            welcomeEnabled: true,
            welcomeChannelId: guild.systemChannelId || undefined,
            welcomeMessage: "🌟 Hey {user}, welcome to {server}! 🌟\n\n🔥 You're member #{memberCount}! 🔥\n\nWe're thrilled to have you join our community! 🎉",
          });
        }
        
        // Store settings in memory for quick access
        this.guildSettings.set(guild.id, settings);
        
        console.log(`Loaded settings for guild: ${guild.name} (${guild.id})`);
      });
    } catch (error) {
      console.error('Failed to load guild settings:', error);
    }
  }
  
  // Get the command prefix for a specific guild
  getPrefix(guildId: string): string {
    return this.guildSettings.get(guildId)?.prefix || this.prefix;
  }
  
  // Get guild-specific settings
  getGuildSettings(guildId: string): GuildSettings | undefined {
    return this.guildSettings.get(guildId);
  }
  
  // Update guild settings in memory after database update
  updateGuildSettings(guildId: string, settings: GuildSettings): void {
    this.guildSettings.set(guildId, settings);
  }
  
  // Get bot status for the API
  getStatus(): { status: string; guilds: number; uptime: number } {
    return {
      status: this.isReady ? 'online' : 'offline',
      guilds: this.client.guilds.cache.size,
      uptime: this.client.uptime || 0,
    };
  }
  
  // Set bot as ready
  setReady(ready: boolean): void {
    this.isReady = ready;
  }
}

// Singleton instance of the bot
let botInstance: DiscordBot | null = null;

// Function to initialize and get the bot instance
export async function initializeBot(storage: IStorage): Promise<DiscordBot> {
  if (!botInstance) {
    botInstance = new DiscordBot(storage);
    await botInstance.initialize();
  }
  
  return botInstance;
}
