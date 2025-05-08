import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

interface BotStatus {
  status: "online" | "offline";
  guilds: number;
  uptime: number;
  memberCount: number;
}

interface BotContextType {
  status: "online" | "offline";
  guilds: number;
  uptime: number;
  memberCount: number;
  refetchStatus: () => void;
}

const BotContext = createContext<BotContextType>({
  status: "offline",
  guilds: 0,
  uptime: 0,
  memberCount: 24, // Default placeholder
  refetchStatus: () => {},
});

export const BotProvider = ({ children }: { children: ReactNode }) => {
  const { data, refetch } = useQuery({
    queryKey: ["/api/bot/status"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const botStatus: BotStatus = {
    status: data?.status || "offline",
    guilds: data?.guilds || 0,
    uptime: data?.uptime || 0,
    memberCount: 24, // Placeholder - in a real app, you'd get this from the API
  };

  return (
    <BotContext.Provider 
      value={{ 
        ...botStatus, 
        refetchStatus: refetch 
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export const useBotStatus = () => useContext(BotContext);
