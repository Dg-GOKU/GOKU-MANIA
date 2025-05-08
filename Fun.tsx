import { FC, useState } from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import CommandsList from "@/components/CommandsList";
import CommandInfoModal from "@/components/CommandInfoModal";
import { Command } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Fun: FC = () => {
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
          <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Fun Commands</h1>
              <Button className="bg-discord-blurple hover:bg-opacity-80">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Suggest a Fun Command
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Fun Command Examples</CardTitle>
                  <CardDescription className="text-discord-light">
                    Lighten up your server with these fun features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Joke Command Example */}
                    <div className="bg-discord-dark p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-discord-green mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" x2="9.01" y1="9" y2="9" />
                          <line x1="15" x2="15.01" y1="9" y2="9" />
                        </svg>
                        <span className="font-medium">Random Joke</span>
                      </div>
                      <div className="text-sm">Why did the scarecrow win an award?</div>
                      <div className="text-sm italic text-discord-light mt-2">Because he was outstanding in his field!</div>
                      <div className="text-xs text-discord-light mt-3">
                        Try with: <span className="bg-discord-darker px-1 py-0.5 rounded">!joke</span>
                      </div>
                    </div>
                    
                    {/* 8Ball Command Example */}
                    <div className="bg-discord-dark p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-discord-blurple mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m4.93 4.93 4.24 4.24" />
                          <path d="M8.5 8.5a2.5 2.5 0 0 1 0 3.535L12 15.87l3.5-3.835a2.5 2.5 0 0 0 0-3.535 2.5 2.5 0 0 0-3.5 0 2.5 2.5 0 0 0-3.5 0z" />
                        </svg>
                        <span className="font-medium">Magic 8Ball</span>
                      </div>
                      <div className="text-sm flex items-start">
                        <span className="font-medium mr-2">Question:</span>
                        <span>Will I win the lottery?</span>
                      </div>
                      <div className="text-sm flex items-center mt-2">
                        <span className="text-discord-blurple mr-2">🎱</span>
                        <span>Don't count on it.</span>
                      </div>
                      <div className="text-xs text-discord-light mt-3">
                        Try with: <span className="bg-discord-darker px-1 py-0.5 rounded">!8ball Will I win the lottery?</span>
                      </div>
                    </div>
                    
                    {/* Coin Flip Example */}
                    <div className="bg-discord-dark p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-discord-yellow mr-2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v12" />
                          <path d="M8 12h8" />
                        </svg>
                        <span className="font-medium">Coin Flip</span>
                      </div>
                      <div className="text-sm flex items-center">
                        <span className="text-discord-yellow mr-2">🪙</span>
                        <span>The coin landed on: Heads!</span>
                      </div>
                      <div className="text-xs text-discord-light mt-3">
                        Try with: <span className="bg-discord-darker px-1 py-0.5 rounded">!flip</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription className="text-discord-light">
                    See which fun commands are most popular
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">!joke</span>
                        <span className="text-sm text-discord-light">256 uses</span>
                      </div>
                      <div className="w-full bg-discord-dark rounded-full h-2">
                        <div className="bg-discord-green h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">!8ball</span>
                        <span className="text-sm text-discord-light">189 uses</span>
                      </div>
                      <div className="w-full bg-discord-dark rounded-full h-2">
                        <div className="bg-discord-blurple h-2 rounded-full" style={{ width: '63%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">!flip</span>
                        <span className="text-sm text-discord-light">147 uses</span>
                      </div>
                      <div className="w-full bg-discord-dark rounded-full h-2">
                        <div className="bg-discord-yellow h-2 rounded-full" style={{ width: '49%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-700">
                      <div className="text-sm mb-3 font-medium">Most Active Users</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs mr-2">JD</div>
                            <span className="text-sm">JokeDude#1234</span>
                          </div>
                          <span className="text-sm text-discord-light">87 uses</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs mr-2">LG</div>
                            <span className="text-sm">LaughGal#5678</span>
                          </div>
                          <span className="text-sm text-discord-light">63 uses</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs mr-2">FM</div>
                            <span className="text-sm">FunMaster#9012</span>
                          </div>
                          <span className="text-sm text-discord-light">48 uses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <CommandsList category="fun" onCommandSelect={handleCommandSelect} />
          </div>
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

export default Fun;
