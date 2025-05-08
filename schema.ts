import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Guild settings
export const guildSettings = pgTable("guild_settings", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull().unique(),
  prefix: text("prefix").notNull().default("$"),
  welcomeEnabled: boolean("welcome_enabled").notNull().default(true),
  welcomeChannelId: text("welcome_channel_id"),
  welcomeMessage: text("welcome_message").notNull().default("Hey {user}, welcome to {server}! Please check out the rules channel."),
});

export const insertGuildSettingsSchema = createInsertSchema(guildSettings).pick({
  guildId: true,
  prefix: true,
  welcomeEnabled: true,
  welcomeChannelId: true,
  welcomeMessage: true,
});

export type InsertGuildSettings = z.infer<typeof insertGuildSettingsSchema>;
export type GuildSettings = typeof guildSettings.$inferSelect;

// Commands
export const commands = pgTable("commands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  usage: text("usage").notNull(),
  permissions: text("permissions"),
  examples: jsonb("examples").$type<string[]>(),
  cooldown: integer("cooldown").default(0),
});

export const insertCommandSchema = createInsertSchema(commands).pick({
  name: true,
  description: true,
  category: true,
  usage: true,
  permissions: true,
  examples: true,
  cooldown: true,
});

export type InsertCommand = z.infer<typeof insertCommandSchema>;
export type Command = typeof commands.$inferSelect;

// Command categories
export const COMMAND_CATEGORIES = ["moderation", "utility", "fun", "music"] as const;
export type CommandCategory = typeof COMMAND_CATEGORIES[number];

// Bot logs
export const botLogs = pgTable("bot_logs", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull(),
  userId: text("user_id").notNull(),
  command: text("command").notNull(),
  timestamp: text("timestamp").notNull(),
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),
});

export const insertBotLogSchema = createInsertSchema(botLogs).pick({
  guildId: true,
  userId: true,
  command: true,
  timestamp: true,
  success: true,
  errorMessage: true,
});

export type InsertBotLog = z.infer<typeof insertBotLogSchema>;
export type BotLog = typeof botLogs.$inferSelect;
