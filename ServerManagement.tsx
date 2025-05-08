import { FC } from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useBotStatus } from "@/components/BotContext";

const ServerManagement: FC = () => {
  const { guilds } = useBotStatus();

  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Server Management</h1>
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
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
                Add New Server
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Managed Servers</CardTitle>
                  <CardDescription className="text-discord-light">
                    Servers where the bot has been installed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-gray-700">
                    {/* Server 1 */}
                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-discord-dark rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-discord-blurple"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Awesome Server</div>
                          <div className="text-sm text-discord-light">24 members • Prefix: !</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className="bg-discord-green text-white">Online</Badge>
                        <Button variant="outline" size="sm" className="border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                          Manage
                        </Button>
                      </div>
                    </div>

                    {/* Server 2 */}
                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-discord-dark rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-discord-pink"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Gaming Community</div>
                          <div className="text-sm text-discord-light">132 members • Prefix: /</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className="bg-discord-green text-white">Online</Badge>
                        <Button variant="outline" size="sm" className="border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                          Manage
                        </Button>
                      </div>
                    </div>

                    {/* Server 3 */}
                    <div className="py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-discord-dark rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-discord-yellow"
                          >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Study Group</div>
                          <div className="text-sm text-discord-light">56 members • Prefix: !</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className="bg-discord-green text-white">Online</Badge>
                        <Button variant="outline" size="sm" className="border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-700 pt-4">
                  <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-discord-light">
                      {guilds || 3} servers managed by DiscordBot
                    </p>
                    <Button variant="outline" size="sm" className="border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                      View All Servers
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription className="text-discord-light">
                      Common server management tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="justify-start border-gray-700 hover:bg-discord-dark hover:text-white">
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
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        View Server Activity
                      </Button>
                      <Button variant="outline" className="justify-start border-gray-700 hover:bg-discord-dark hover:text-white">
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
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Manage Server Roles
                      </Button>
                      <Button variant="outline" className="justify-start border-gray-700 hover:bg-discord-dark hover:text-white">
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
                        Edit Server Settings
                      </Button>
                      <Button variant="outline" className="justify-start border-gray-700 hover:bg-discord-dark hover:text-white">
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                        </svg>
                        Create Custom Commands
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Server Stats</CardTitle>
                    <CardDescription className="text-discord-light">
                      Overview of your server activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-discord-light">Commands Used (Today)</p>
                          <p className="text-2xl font-bold">247</p>
                        </div>
                        <div className="p-2 bg-discord-dark rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-discord-blurple"
                          >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-discord-light">New Members (Week)</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="p-2 bg-discord-dark rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-discord-green"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <p className="text-sm text-discord-light">Music Played (Hours)</p>
                          <p className="text-2xl font-bold">7.5</p>
                        </div>
                        <div className="p-2 bg-discord-dark rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-discord-pink"
                          >
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ServerManagement;
