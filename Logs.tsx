import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BotLog } from "@shared/schema";

const Logs: FC = () => {
  // In a real application, you would get this from the selected server
  const guildId = "123456789";
  
  const [logLimit, setLogLimit] = useState<number>(50);
  
  const { data: logs, isLoading } = useQuery({
    queryKey: [`/api/logs/${guildId}?limit=${logLimit}`],
  });
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Group logs by date for easier navigation
  const groupLogsByDate = (logs: BotLog[] = []) => {
    const grouped: Record<string, BotLog[]> = {};
    
    logs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(log);
    });
    
    return grouped;
  };
  
  const groupedLogs = groupLogsByDate(logs);
  
  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark">
          <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Bot Logs</h1>
              <div className="flex items-center space-x-2">
                <Select
                  value={logLimit.toString()}
                  onValueChange={(value) => setLogLimit(parseInt(value))}
                >
                  <SelectTrigger className="w-36 border-gray-700 bg-discord-darker">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-discord-darker text-discord-light">
                    <SelectItem value="25">Last 25 logs</SelectItem>
                    <SelectItem value="50">Last 50 logs</SelectItem>
                    <SelectItem value="100">Last 100 logs</SelectItem>
                    <SelectItem value="200">Last 200 logs</SelectItem>
                  </SelectContent>
                </Select>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  Export Logs
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-discord-darker">
                <TabsTrigger value="all" className="data-[state=active]:bg-discord-dark">All Logs</TabsTrigger>
                <TabsTrigger value="commands" className="data-[state=active]:bg-discord-dark">Commands</TabsTrigger>
                <TabsTrigger value="moderation" className="data-[state=active]:bg-discord-dark">Moderation</TabsTrigger>
                <TabsTrigger value="errors" className="data-[state=active]:bg-discord-dark">Errors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>All Bot Activity</CardTitle>
                    <CardDescription className="text-discord-light">
                      Complete history of bot actions and events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-discord-blurple"></div>
                        <span className="ml-3 text-discord-light">Loading logs...</span>
                      </div>
                    ) : logs?.length === 0 ? (
                      <div className="text-center py-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto h-12 w-12 text-discord-light opacity-50 mb-3"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                        </svg>
                        <p className="text-discord-light">No logs found</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {Object.entries(groupedLogs).map(([date, dateLogs]) => (
                          <div key={date}>
                            <div className="sticky top-0 bg-discord-darker py-2 px-1 z-10 flex items-center">
                              <div className="h-px flex-1 bg-gray-700"></div>
                              <span className="px-2 text-discord-light text-sm font-medium">{date}</span>
                              <div className="h-px flex-1 bg-gray-700"></div>
                            </div>
                            <div className="space-y-2 mt-3">
                              {dateLogs.map((log) => (
                                <div key={log.id} className="bg-discord-dark p-3 rounded-md">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center">
                                      <Badge className={`mr-2 ${log.success ? 'bg-discord-green' : 'bg-discord-red'}`}>
                                        {log.success ? 'Success' : 'Error'}
                                      </Badge>
                                      <span className="font-medium">
                                        !{log.command}
                                      </span>
                                    </div>
                                    <span className="text-xs text-discord-light">
                                      {formatTimestamp(log.timestamp)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <div>
                                      <span className="text-discord-light mr-1">User:</span>
                                      <span>{log.userId}</span>
                                    </div>
                                    {!log.success && log.errorMessage && (
                                      <span className="text-discord-red">{log.errorMessage}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="commands" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Command Usage</CardTitle>
                    <CardDescription className="text-discord-light">
                      Logs of all commands used in the server
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-discord-blurple"></div>
                        <span className="ml-3 text-discord-light">Loading logs...</span>
                      </div>
                    ) : logs?.length === 0 ? (
                      <div className="text-center py-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto h-12 w-12 text-discord-light opacity-50 mb-3"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                        </svg>
                        <p className="text-discord-light">No command logs found</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {logs
                          .filter(log => log.success)
                          .map((log) => (
                            <div key={log.id} className="bg-discord-dark p-3 rounded-md">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  <span className="font-mono text-discord-blurple mr-2">
                                    !{log.command}
                                  </span>
                                  <span className="text-sm">by {log.userId}</span>
                                </div>
                                <span className="text-xs text-discord-light">
                                  {formatTimestamp(log.timestamp)}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="moderation" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Moderation Actions</CardTitle>
                    <CardDescription className="text-discord-light">
                      History of all moderation commands used
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-discord-blurple"></div>
                        <span className="ml-3 text-discord-light">Loading logs...</span>
                      </div>
                    ) : logs?.length === 0 ? (
                      <div className="text-center py-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto h-12 w-12 text-discord-light opacity-50 mb-3"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                        </svg>
                        <p className="text-discord-light">No moderation logs found</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {logs
                          .filter(log => ['kick', 'ban', 'timeout', 'purge'].includes(log.command))
                          .map((log) => (
                            <div key={log.id} className="bg-discord-dark p-3 rounded-md">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium">
                                  Moderator {log.userId} used !{log.command}
                                </span>
                                <span className="text-xs text-discord-light">
                                  {formatTimestamp(log.timestamp)}
                                </span>
                              </div>
                              <div className="text-sm">
                                {!log.success && log.errorMessage ? (
                                  <span className="text-discord-red">Error: {log.errorMessage}</span>
                                ) : (
                                  <span className="text-discord-green">Action completed successfully</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="errors" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Error Logs</CardTitle>
                    <CardDescription className="text-discord-light">
                      Log of errors and failed commands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-discord-blurple"></div>
                        <span className="ml-3 text-discord-light">Loading logs...</span>
                      </div>
                    ) : logs?.length === 0 ? (
                      <div className="text-center py-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto h-12 w-12 text-discord-light opacity-50 mb-3"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                        </svg>
                        <p className="text-discord-light">No error logs found</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {logs
                          .filter(log => !log.success)
                          .map((log) => (
                            <div key={log.id} className="bg-discord-dark p-3 rounded-md border-l-4 border-discord-red">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-discord-red mr-2"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" x2="12" y1="8" y2="12" />
                                    <line x1="12" x2="12.01" y1="16" y2="16" />
                                  </svg>
                                  <span className="font-medium">
                                    Error in !{log.command}
                                  </span>
                                </div>
                                <span className="text-xs text-discord-light">
                                  {formatTimestamp(log.timestamp)}
                                </span>
                              </div>
                              <div className="ml-7">
                                <div className="text-sm mb-1">
                                  <span className="text-discord-light mr-1">User:</span>
                                  <span>{log.userId}</span>
                                </div>
                                <div className="text-sm bg-discord-darker p-2 rounded-md text-discord-red border border-discord-red border-opacity-20">
                                  {log.errorMessage || "Unknown error occurred"}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
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

export default Logs;
