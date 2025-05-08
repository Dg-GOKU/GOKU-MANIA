import { FC, useState } from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import CommandsList from "@/components/CommandsList";
import CommandInfoModal from "@/components/CommandInfoModal";
import { Command } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Utility: FC = () => {
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
              <h1 className="text-2xl font-bold">Utility Commands</h1>
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Create Custom Utility
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Most Used Utilities</CardTitle>
                  <CardDescription className="text-discord-light">
                    Your server's favorite utility commands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-blue-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-blurple"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">!help</div>
                          <div className="text-sm text-discord-light">Display available commands</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Used: 342 times</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-blue-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-blurple"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="M6 8h.01" />
                            <path d="M10 8h.01" />
                            <path d="M14 8h.01" />
                            <path d="M18 8h.01" />
                            <path d="M8 12h.01" />
                            <path d="M12 12h.01" />
                            <path d="M16 12h.01" />
                            <path d="M7 16h10" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">!serverinfo</div>
                          <div className="text-sm text-discord-light">Show server information</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Used: 186 times</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-blue-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-blurple"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">!userinfo</div>
                          <div className="text-sm text-discord-light">Show user information</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Used: 124 times</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Example Responses</CardTitle>
                  <CardDescription className="text-discord-light">
                    Preview of utility command outputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-discord-dark p-4 rounded-lg border border-gray-700 mb-4">
                    <div className="text-discord-blurple font-semibold mb-2">Server Information</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-discord-light">Name:</div>
                      <div>Awesome Server</div>
                      <div className="text-discord-light">Owner:</div>
                      <div>ServerOwner#1234</div>
                      <div className="text-discord-light">Created:</div>
                      <div>January 15, 2022</div>
                      <div className="text-discord-light">Members:</div>
                      <div>245 (230 online)</div>
                      <div className="text-discord-light">Channels:</div>
                      <div>15 text, 5 voice</div>
                      <div className="text-discord-light">Roles:</div>
                      <div>12</div>
                    </div>
                  </div>
                  
                  <div className="bg-discord-dark p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
                      <div>
                        <div className="text-discord-blurple font-semibold">User Information</div>
                        <div className="text-xs text-discord-light">User123#4567</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                      <div className="text-discord-light">Joined Server:</div>
                      <div>March 10, 2022</div>
                      <div className="text-discord-light">Account Created:</div>
                      <div>February 2, 2022</div>
                      <div className="text-discord-light">Roles:</div>
                      <div>Member, Contributor</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <CommandsList category="utility" onCommandSelect={handleCommandSelect} />
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

export default Utility;
