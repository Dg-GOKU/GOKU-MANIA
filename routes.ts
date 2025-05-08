import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertGuildSettingsSchema, 
  COMMAND_CATEGORIES, 
  insertCommandSchema,
  insertBotLogSchema 
} from "@shared/schema";
import { initializeBot } from "./discord/bot";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Initialize Discord bot
  const bot = await initializeBot(storage);
  
  // Guild Settings Routes
  app.get("/api/guild-settings/:guildId", async (req, res) => {
    const { guildId } = req.params;
    const settings = await storage.getGuildSettings(guildId);
    
    if (!settings) {
      return res.status(404).json({ message: "Guild settings not found" });
    }
    
    res.json(settings);
  });
  
  app.post("/api/guild-settings", async (req, res) => {
    try {
      const validatedData = insertGuildSettingsSchema.parse(req.body);
      const settings = await storage.createGuildSettings(validatedData);
      res.status(201).json(settings);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data", error });
    }
  });
  
  app.patch("/api/guild-settings/:guildId", async (req, res) => {
    const { guildId } = req.params;
    
    try {
      const validatedData = insertGuildSettingsSchema.partial().parse(req.body);
      const settings = await storage.updateGuildSettings(guildId, validatedData);
      
      if (!settings) {
        return res.status(404).json({ message: "Guild settings not found" });
      }
      
      res.json(settings);
      
      // If the welcome settings were updated, reflect changes in the bot
      if ('welcomeEnabled' in validatedData || 'welcomeChannelId' in validatedData || 'welcomeMessage' in validatedData) {
        bot.updateGuildSettings(guildId, settings);
      }
      
    } catch (error) {
      res.status(400).json({ message: "Invalid request data", error });
    }
  });
  
  // Commands Routes
  app.get("/api/commands", async (req, res) => {
    const category = req.query.category as string | undefined;
    
    if (category && !COMMAND_CATEGORIES.includes(category as any)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    
    const commands = category 
      ? await storage.getCommandsByCategory(category) 
      : await storage.getAllCommands();
    
    res.json(commands);
  });
  
  app.get("/api/commands/:name", async (req, res) => {
    const { name } = req.params;
    const command = await storage.getCommandByName(name);
    
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }
    
    res.json(command);
  });
  
  app.post("/api/commands", async (req, res) => {
    try {
      const validatedData = insertCommandSchema.parse(req.body);
      const command = await storage.createCommand(validatedData);
      res.status(201).json(command);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data", error });
    }
  });
  
  app.patch("/api/commands/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid command ID" });
    }
    
    try {
      const validatedData = insertCommandSchema.partial().parse(req.body);
      const command = await storage.updateCommand(id, validatedData);
      
      if (!command) {
        return res.status(404).json({ message: "Command not found" });
      }
      
      res.json(command);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data", error });
    }
  });
  
  app.delete("/api/commands/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid command ID" });
    }
    
    const success = await storage.deleteCommand(id);
    
    if (!success) {
      return res.status(404).json({ message: "Command not found" });
    }
    
    res.status(204).end();
  });
  
  // Logs Routes
  app.get("/api/logs/:guildId", async (req, res) => {
    const { guildId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    
    const logs = await storage.getLogsByGuild(guildId, limit);
    res.json(logs);
  });
  
  app.post("/api/logs", async (req, res) => {
    try {
      const validatedData = insertBotLogSchema.parse(req.body);
      const log = await storage.createLog(validatedData);
      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data", error });
    }
  });
  
  // Bot Status Route
  app.get("/api/bot/status", async (req, res) => {
    const status = bot.getStatus();
    res.json(status);
  });

  return httpServer;
}
