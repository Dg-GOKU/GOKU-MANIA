import { FC, useState } from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import CommandsList from "@/components/CommandsList";
import CommandInfoModal from "@/components/CommandInfoModal";
import { Command } from "@shared/schema";

const Commands: FC = () => {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [commandModalOpen, setCommandModalOpen] = useState(false);

  const handleCommandSelect = (command: Command) => {
    setSelectedCommand(command);
    setCommandModalOpen(true);
  };

  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark">
          <CommandsList onCommandSelect={handleCommandSelect} />
        </main>
      </div>
      <CommandInfoModal
        isOpen={commandModalOpen}
        onClose={() => setCommandModalOpen(false)}
        command={selectedCommand}
      />
    </>
  );
};

export default Commands;
