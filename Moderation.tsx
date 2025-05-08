import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import CommandsList from "@/components/CommandsList";
import CommandInfoModal from "@/components/CommandInfoModal";
import { Command } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Moderation: FC = () => {
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
              <h1 className="text-2xl font-bold">Moderation Tools</h1>
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
                Customize
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Moderation Overview</CardTitle>
                  <CardDescription className="text-discord-light">
                    Maintain your server's community standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-red-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-red"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Kicks</div>
                          <div className="text-sm text-discord-light">Temporarily remove users</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Last 30 days: 8</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-red-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-red"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Bans</div>
                          <div className="text-sm text-discord-light">Permanently remove users</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Last 30 days: 3</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-yellow-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-yellow"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Timeouts</div>
                          <div className="text-sm text-discord-light">Temporarily mute users</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Last 30 days: 12</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 bg-gray-900 bg-opacity-30 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-discord-light"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Deleted Messages</div>
                          <div className="text-sm text-discord-light">Remove inappropriate content</div>
                        </div>
                      </div>
                      <div className="text-sm text-discord-light">Last 30 days: 56</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Recent Actions</CardTitle>
                  <CardDescription className="text-discord-light">
                    Latest moderation activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-y-auto scrollbar-discord">
                  <div className="space-y-3">
                    <div className="bg-discord-dark p-3 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">User Banned</span>
                        <span className="text-discord-light">2 hours ago</span>
                      </div>
                      <p>@ToxicUser#1234 was banned by @Moderator for inappropriate behavior</p>
                    </div>
                    
                    <div className="bg-discord-dark p-3 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Messages Deleted</span>
                        <span className="text-discord-light">5 hours ago</span>
                      </div>
                      <p>10 messages were deleted in #general by @Admin</p>
                    </div>
                    
                    <div className="bg-discord-dark p-3 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">User Timeout</span>
                        <span className="text-discord-light">Yesterday</span>
                      </div>
                      <p>@SpamBot#5678 was timed out for 2 hours by @Moderator for spamming</p>
                    </div>
                    
                    <div className="bg-discord-dark p-3 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">User Kicked</span>
                        <span className="text-discord-light">Yesterday</span>
                      </div>
                      <p>@Troll#9012 was kicked by @Admin for disrupting conversation</p>
                    </div>
                    
                    <div className="bg-discord-dark p-3 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Messages Deleted</span>
                        <span className="text-discord-light">2 days ago</span>
                      </div>
                      <p>5 messages were deleted in #memes by @Moderator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <CommandsList category="moderation" onCommandSelect={handleCommandSelect} />
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

export default Moderation;
