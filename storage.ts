import { 
  users, type User, type InsertUser,
  guildSettings, type GuildSettings, type InsertGuildSettings,
  commands, type Command, type InsertCommand,
  botLogs, type BotLog, type InsertBotLog
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Guild settings operations
  getGuildSettings(guildId: string): Promise<GuildSettings | undefined>;
  createGuildSettings(settings: InsertGuildSettings): Promise<GuildSettings>;
  updateGuildSettings(guildId: string, settings: Partial<InsertGuildSettings>): Promise<GuildSettings | undefined>;

  // Commands operations
  getAllCommands(): Promise<Command[]>;
  getCommandsByCategory(category: string): Promise<Command[]>;
  getCommandByName(name: string): Promise<Command | undefined>;
  createCommand(command: InsertCommand): Promise<Command>;
  updateCommand(id: number, command: Partial<InsertCommand>): Promise<Command | undefined>;
  deleteCommand(id: number): Promise<boolean>;

  // Logs operations
  createLog(log: InsertBotLog): Promise<BotLog>;
  getLogsByGuild(guildId: string, limit?: number): Promise<BotLog[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private guilds: Map<string, GuildSettings>;
  private commandsMap: Map<number, Command>;
  private logs: BotLog[];
  
  private userId: number;
  private guildId: number;
  private commandId: number;
  private logId: number;
  
  constructor() {
    this.users = new Map();
    this.guilds = new Map();
    this.commandsMap = new Map();
    this.logs = [];
    
    this.userId = 1;
    this.guildId = 1;
    this.commandId = 1;
    this.logId = 1;
    
    // Initialize with some default commands
    this.initializeDefaultCommands();
  }
  
  private initializeDefaultCommands() {
    // Moderation commands
    const moderationCommands: InsertCommand[] = [
      {
        name: "kick",
        description: "Kicks a member from the server with an optional reason.",
        category: "moderation",
        usage: "kick @user [reason]",
        permissions: "KICK_MEMBERS",
        examples: ["kick @JohnDoe Spamming in general chat"],
        cooldown: 5
      },
      {
        name: "ban",
        description: "Permanently bans a member from the server with an optional reason.",
        category: "moderation",
        usage: "ban @user [reason]",
        permissions: "BAN_MEMBERS",
        examples: ["ban @JaneDoe Inappropriate behavior"],
        cooldown: 5
      },
      {
        name: "timeout",
        description: "Times out a member for a specified duration (max 28 days).",
        category: "moderation",
        usage: "timeout @user duration [reason]",
        permissions: "MODERATE_MEMBERS",
        examples: ["timeout @User123 1h Cool down period"],
        cooldown: 5
      },
      {
        name: "purge",
        description: "Deletes a specified amount of messages from the channel.",
        category: "moderation",
        usage: "purge amount [user]",
        permissions: "MANAGE_MESSAGES",
        examples: ["purge 10"],
        cooldown: 5
      }
    ];
    
    // Utility commands
    const utilityCommands: InsertCommand[] = [
      {
        name: "help",
        description: "Displays a list of commands or detailed help for a specific command.",
        category: "utility",
        usage: "help [command]",
        examples: ["help ban"],
        cooldown: 3
      },
      {
        name: "serverinfo",
        description: "Displays information about the current server.",
        category: "utility",
        usage: "serverinfo",
        examples: ["serverinfo"],
        cooldown: 5
      },
      {
        name: "userinfo",
        description: "Displays information about a specific user.",
        category: "utility",
        usage: "userinfo [@user]",
        examples: ["userinfo @User123"],
        cooldown: 5
      }
    ];
    
    // Fun commands
    const funCommands: InsertCommand[] = [
      {
        name: "joke",
        description: "Tells a random joke from our collection.",
        category: "fun",
        usage: "joke",
        examples: ["joke"],
        cooldown: 3
      },
      {
        name: "8ball",
        description: "Ask the magic 8ball a question and receive a mysterious answer.",
        category: "fun",
        usage: "8ball question",
        examples: ["8ball Will I win the lottery?"],
        cooldown: 2
      },
      {
        name: "flip",
        description: "Flips a coin and tells you if it's heads or tails.",
        category: "fun",
        usage: "flip",
        examples: ["flip"],
        cooldown: 1
      }
    ];
    
    // Music commands
    const musicCommands: InsertCommand[] = [
      {
        name: "play",
        description: "Plays a song from YouTube. You must be in a voice channel.",
        category: "music",
        usage: "play song",
        examples: ["play never gonna give you up"],
        cooldown: 3
      },
      {
        name: "skip",
        description: "Skips the currently playing song.",
        category: "music",
        usage: "skip",
        examples: ["skip"],
        cooldown: 1
      },
      {
        name: "queue",
        description: "Shows the current song queue.",
        category: "music",
        usage: "queue",
        examples: ["queue"],
        cooldown: 2
      },
      {
        name: "stop",
        description: "Stops playing music and clears the queue.",
        category: "music",
        usage: "stop",
        examples: ["stop"],
        cooldown: 1
      }
    ];
    
    // Add all commands to the map
    [...moderationCommands, ...utilityCommands, ...funCommands, ...musicCommands].forEach(cmd => {
      this.createCommand(cmd);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Guild settings operations
  async getGuildSettings(guildId: string): Promise<GuildSettings | undefined> {
    return this.guilds.get(guildId);
  }

  async createGuildSettings(settings: InsertGuildSettings): Promise<GuildSettings> {
    const id = this.guildId++;
    const guildSetting: GuildSettings = { ...settings, id };
    this.guilds.set(settings.guildId, guildSetting);
    return guildSetting;
  }

  async updateGuildSettings(guildId: string, settings: Partial<InsertGuildSettings>): Promise<GuildSettings | undefined> {
    const existingSettings = this.guilds.get(guildId);
    if (!existingSettings) return undefined;
    
    const updatedSettings: GuildSettings = { ...existingSettings, ...settings };
    this.guilds.set(guildId, updatedSettings);
    return updatedSettings;
  }

  // Commands operations
  async getAllCommands(): Promise<Command[]> {
    return Array.from(this.commandsMap.values());
  }

  async getCommandsByCategory(category: string): Promise<Command[]> {
    return Array.from(this.commandsMap.values()).filter(
      (cmd) => cmd.category === category,
    );
  }

  async getCommandByName(name: string): Promise<Command | undefined> {
    return Array.from(this.commandsMap.values()).find(
      (cmd) => cmd.name === name,
    );
  }

  async createCommand(command: InsertCommand): Promise<Command> {
    const id = this.commandId++;
    const newCommand: Command = { ...command, id };
    this.commandsMap.set(id, newCommand);
    return newCommand;
  }

  async updateCommand(id: number, command: Partial<InsertCommand>): Promise<Command | undefined> {
    const existingCommand = this.commandsMap.get(id);
    if (!existingCommand) return undefined;
    
    const updatedCommand: Command = { ...existingCommand, ...command };
    this.commandsMap.set(id, updatedCommand);
    return updatedCommand;
  }

  async deleteCommand(id: number): Promise<boolean> {
    return this.commandsMap.delete(id);
  }

  // Logs operations
  async createLog(log: InsertBotLog): Promise<BotLog> {
    const id = this.logId++;
    const newLog: BotLog = { ...log, id };
    this.logs.push(newLog);
    return newLog;
  }

  async getLogsByGuild(guildId: string, limit = 50): Promise<BotLog[]> {
    return this.logs
      .filter((log) => log.guildId === guildId)
      .sort((a, b) => {
        // Sort by timestamp in descending order (newest first)
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      })
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
