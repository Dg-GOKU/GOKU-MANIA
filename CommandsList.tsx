import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Command } from "@shared/schema";
import CommandItem from "./CommandItem";
import { Input } from "@/components/ui/input";

interface CommandsListProps {
  category?: string;
  onCommandSelect: (command: Command) => void;
}

const CommandsList: FC<CommandsListProps> = ({ category, onCommandSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>(category || "all");

  const { data: commands, isLoading } = useQuery({
    queryKey: [
      category ? `/api/commands?category=${category}` : "/api/commands",
    ],
    refetchOnWindowFocus: false,
  });

  const filteredCommands = commands
    ? commands.filter((cmd: Command) =>
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const categoryCommands = (cat: string) => {
    if (cat === "all") return filteredCommands;
    return filteredCommands.filter((cmd: Command) => cmd.category === cat);
  };

  const displayedCommands = categoryCommands(activeTab);

  // Group commands by category
  const groupedCommands = displayedCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Bot Commands</h1>
        <div className="flex space-x-2">
          <div className="px-4 py-2 bg-discord-darker rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-discord-light mr-2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              type="text"
              placeholder="Search commands..."
              className="bg-transparent border-none outline-none text-discord-light placeholder-discord-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="px-3 py-2 bg-discord-blurple rounded-md text-white flex items-center cursor-pointer hover:bg-opacity-80 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Create Command</span>
          </div>
        </div>
      </div>

      {/* Command Categories Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <div className="flex space-x-1">
          <button
            className={`px-5 py-2.5 ${
              activeTab === "all"
                ? "border-b-2 border-discord-blurple text-discord-lightest font-medium"
                : "text-discord-light hover:text-discord-lightest"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Commands
          </button>
          <button
            className={`px-5 py-2.5 ${
              activeTab === "moderation"
                ? "border-b-2 border-discord-blurple text-discord-lightest font-medium"
                : "text-discord-light hover:text-discord-lightest"
            }`}
            onClick={() => setActiveTab("moderation")}
          >
            Moderation
          </button>
          <button
            className={`px-5 py-2.5 ${
              activeTab === "utility"
                ? "border-b-2 border-discord-blurple text-discord-lightest font-medium"
                : "text-discord-light hover:text-discord-lightest"
            }`}
            onClick={() => setActiveTab("utility")}
          >
            Utility
          </button>
          <button
            className={`px-5 py-2.5 ${
              activeTab === "fun"
                ? "border-b-2 border-discord-blurple text-discord-lightest font-medium"
                : "text-discord-light hover:text-discord-lightest"
            }`}
            onClick={() => setActiveTab("fun")}
          >
            Fun
          </button>
          <button
            className={`px-5 py-2.5 ${
              activeTab === "music"
                ? "border-b-2 border-discord-blurple text-discord-lightest font-medium"
                : "text-discord-light hover:text-discord-lightest"
            }`}
            onClick={() => setActiveTab("music")}
          >
            Music
          </button>
        </div>
      </div>

      {/* Commands List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="spinner-border text-discord-blurple" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 text-discord-light">Loading commands...</p>
        </div>
      ) : displayedCommands.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-discord-light">No commands found</p>
          {searchQuery && (
            <p className="text-discord-light mt-2">
              Try a different search term
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div
              key={category}
              className="rounded-lg bg-discord-darker overflow-hidden border border-gray-700"
            >
              <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg">
                  {category.charAt(0).toUpperCase() + category.slice(1)} Commands
                </h2>
                {category === "moderation" && (
                  <div className="text-xs px-2 py-1 bg-discord-red bg-opacity-20 text-discord-red rounded">
                    Admin Only
                  </div>
                )}
              </div>
              <div className="divide-y divide-gray-700">
                {cmds.map((command) => (
                  <CommandItem
                    key={command.id}
                    command={command}
                    onClick={() => onCommandSelect(command)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandsList;
