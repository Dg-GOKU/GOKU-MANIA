import { FC } from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Permissions: FC = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark">
          <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Bot Permissions</h1>
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
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Changes
              </Button>
            </div>
            
            <Tabs defaultValue="roles" className="mb-6">
              <TabsList className="bg-discord-darker">
                <TabsTrigger value="roles" className="data-[state=active]:bg-discord-dark">Roles</TabsTrigger>
                <TabsTrigger value="channels" className="data-[state=active]:bg-discord-dark">Channels</TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-discord-dark">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="roles" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Role Permissions</CardTitle>
                    <CardDescription className="text-discord-light">
                      Configure which roles can use specific commands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-4 h-4 rounded-full bg-red-500"></div>
                          <span className="font-medium">Admin</span>
                          <Badge className="bg-discord-dark text-discord-light">8 members</Badge>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Manage
                          </Button>
                          <Button variant="outline" className="text-green-400 border-gray-700 hover:bg-discord-dark hover:text-green-400">
                            All Permissions
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <span className="font-medium">Moderator</span>
                          <Badge className="bg-discord-dark text-discord-light">12 members</Badge>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Manage
                          </Button>
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Customize
                          </Button>
                        </div>
                      </div>
                      <div className="ml-6 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Moderation Commands</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Music Controls</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Manage Messages</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Kick Members</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Ban Members</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <span className="font-medium">DJ</span>
                          <Badge className="bg-discord-dark text-discord-light">5 members</Badge>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Manage
                          </Button>
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Customize
                          </Button>
                        </div>
                      </div>
                      <div className="ml-6 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Music Controls</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                          <span className="font-medium">Member</span>
                          <Badge className="bg-discord-dark text-discord-light">203 members</Badge>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Manage
                          </Button>
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Customize
                          </Button>
                        </div>
                      </div>
                      <div className="ml-6 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Utility Commands</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fun Commands</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Music Requests</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="channels" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Channel Permissions</CardTitle>
                    <CardDescription className="text-discord-light">
                      Configure which channels allow bot commands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-discord-light"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="font-medium">general</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            All Commands
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-discord-light"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="font-medium">bot-commands</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            All Commands
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-discord-light"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="font-medium">music</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Customize
                          </Button>
                        </div>
                      </div>
                      <div className="ml-6 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Music Commands</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Utility Commands</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fun Commands</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Moderation Commands</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-discord-light"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="font-medium">mod-chat</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Customize
                          </Button>
                        </div>
                      </div>
                      <div className="ml-6 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Moderation Commands</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Utility Commands</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>User Permissions</CardTitle>
                    <CardDescription className="text-discord-light">
                      Configure command access for specific users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-discord-light"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Search users..." 
                          className="w-full pl-10 pr-4 py-2 bg-discord-dark border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-discord-blurple focus:border-discord-blurple" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-sm">JS</div>
                          <div>
                            <span className="font-medium">JohnServer#1234</span>
                            <div className="text-xs text-discord-light">Server Owner</div>
                          </div>
                        </div>
                        <div>
                          <Badge className="bg-red-500">All Permissions</Badge>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm">MM</div>
                          <div>
                            <span className="font-medium">ModMan#5678</span>
                            <div className="text-xs text-discord-light">Moderator</div>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            View Permissions
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-sm">DJ</div>
                          <div>
                            <span className="font-medium">DJMaster#9012</span>
                            <div className="text-xs text-discord-light">DJ</div>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            View Permissions
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-sm">BP</div>
                          <div>
                            <span className="font-medium">BotProdigy#3456</span>
                            <div className="text-xs text-discord-light">Member</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-discord-blurple">Override</Badge>
                          <Button variant="outline" className="text-discord-light border-gray-700 hover:bg-discord-dark hover:text-white">
                            Manage
                          </Button>
                        </div>
                      </div>
                      <div className="ml-12 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Music Controls</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Moderation Commands</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Permissions;
