import { FC, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Configuration: FC = () => {
  const { toast } = useToast();
  // In a real application, you would get this from the selected server
  const guildId = "123456789";
  
  const { data: settings, isLoading } = useQuery({
    queryKey: [`/api/guild-settings/${guildId}`],
  });
  
  const [prefix, setPrefix] = useState<string>(settings?.prefix || "!");
  const [welcomeEnabled, setWelcomeEnabled] = useState<boolean>(settings?.welcomeEnabled || true);
  const [welcomeChannel, setWelcomeChannel] = useState<string>(settings?.welcomeChannelId || "");
  const [welcomeMessage, setWelcomeMessage] = useState<string>(settings?.welcomeMessage || "");
  
  // Update settings when data is loaded
  useState(() => {
    if (settings) {
      setPrefix(settings.prefix);
      setWelcomeEnabled(settings.welcomeEnabled);
      setWelcomeChannel(settings.welcomeChannelId || "");
      setWelcomeMessage(settings.welcomeMessage || "");
    }
  });
  
  // Mutation to update settings
  const updateSettings = useMutation({
    mutationFn: (newSettings: any) => 
      apiRequest("PATCH", `/api/guild-settings/${guildId}`, newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/guild-settings/${guildId}`] });
      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update settings: ${error}`,
        variant: "destructive",
      });
    },
  });
  
  const handleSave = () => {
    updateSettings.mutate({
      prefix,
      welcomeEnabled,
      welcomeChannelId: welcomeChannel,
      welcomeMessage,
    });
  };

  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark">
          <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Bot Configuration</h1>
              <Button 
                onClick={handleSave}
                disabled={updateSettings.isPending}
                className="bg-discord-blurple hover:bg-opacity-80"
              >
                {updateSettings.isPending ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
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
                  </div>
                )}
              </Button>
            </div>
            
            <Tabs defaultValue="general" className="mb-6">
              <TabsList className="bg-discord-darker">
                <TabsTrigger value="general" className="data-[state=active]:bg-discord-dark">General</TabsTrigger>
                <TabsTrigger value="welcome" className="data-[state=active]:bg-discord-dark">Welcome</TabsTrigger>
                <TabsTrigger value="commands" className="data-[state=active]:bg-discord-dark">Commands</TabsTrigger>
                <TabsTrigger value="moderation" className="data-[state=active]:bg-discord-dark">Moderation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription className="text-discord-light">
                      Basic configuration for your Discord bot
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prefix">Command Prefix</Label>
                      <div className="flex">
                        <Input
                          id="prefix"
                          value={prefix}
                          onChange={(e) => setPrefix(e.target.value)}
                          placeholder="!"
                          className="max-w-24 bg-discord-dark border-gray-700"
                        />
                        <div className="ml-3 text-discord-light flex items-center">
                          Example: {prefix}help, {prefix}ban, {prefix}play
                        </div>
                      </div>
                      <p className="text-sm text-discord-light">
                        This is the character users will type before commands
                      </p>
                    </div>
                    
                    <Separator className="bg-gray-700 my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Bot Status</h3>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="activity-type">Activity Type</Label>
                          <p className="text-sm text-discord-light">How the bot appears in the member list</p>
                        </div>
                        <div className="w-40">
                          <select id="activity-type" className="w-full rounded bg-discord-dark border border-gray-700 p-2 text-discord-light">
                            <option>Playing</option>
                            <option>Listening to</option>
                            <option>Watching</option>
                            <option>Competing in</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="activity-name">Activity Name</Label>
                          <p className="text-sm text-discord-light">What the bot will display as its status</p>
                        </div>
                        <div className="w-40">
                          <Input 
                            id="activity-name" 
                            placeholder="!help" 
                            className="bg-discord-dark border-gray-700" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="welcome" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Welcome Message Settings</CardTitle>
                    <CardDescription className="text-discord-light">
                      Configure how new members are greeted when they join
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="welcome-enabled">Enable Welcome Messages</Label>
                        <p className="text-sm text-discord-light">Send a message when new members join</p>
                      </div>
                      <Switch
                        id="welcome-enabled"
                        checked={welcomeEnabled}
                        onCheckedChange={setWelcomeEnabled}
                        className="data-[state=checked]:bg-discord-blurple"
                      />
                    </div>
                    
                    <Separator className="bg-gray-700 my-2" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="welcome-channel">Welcome Channel</Label>
                      <select 
                        id="welcome-channel"
                        value={welcomeChannel}
                        onChange={(e) => setWelcomeChannel(e.target.value)}
                        disabled={!welcomeEnabled}
                        className="w-full rounded bg-discord-dark border border-gray-700 p-2 text-discord-light disabled:opacity-50"
                      >
                        <option value="">Select a channel</option>
                        <option value="welcome">#welcome</option>
                        <option value="general">#general</option>
                        <option value="introductions">#introductions</option>
                      </select>
                      <p className="text-sm text-discord-light">
                        The channel where welcome messages will be sent
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="welcome-message">Welcome Message</Label>
                      <textarea
                        id="welcome-message"
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        disabled={!welcomeEnabled}
                        rows={4}
                        className="w-full rounded bg-discord-dark border border-gray-700 p-2 text-discord-light disabled:opacity-50"
                        placeholder="Hey {user}, welcome to {server}!"
                      />
                      <p className="text-sm text-discord-light">
                        Available variables: {"{user}"}, {"{server}"}, {"{memberCount}"}
                      </p>
                    </div>
                    
                    {welcomeEnabled && (
                      <div className="mt-4 bg-discord-dark p-4 rounded-lg border border-gray-700">
                        <p className="text-sm font-medium mb-2">Preview:</p>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 text-white"
                            >
                              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                              <circle cx="12" cy="13" r="3" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-discord-blurple font-medium">
                              DiscordBot
                            </div>
                            <div className="mt-1">
                              {welcomeMessage
                                .replace(/{user}/g, "@NewUser")
                                .replace(/{server}/g, "Awesome Server")
                                .replace(/{memberCount}/g, "24")}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="commands" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Command Settings</CardTitle>
                    <CardDescription className="text-discord-light">
                      Enable or disable specific commands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Moderation Commands</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-discord-light">Disable All</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 ml-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!kick</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!ban</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!timeout</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!purge</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Utility Commands</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-discord-light">Disable All</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 ml-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!help</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!serverinfo</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!userinfo</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Fun Commands</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-discord-light">Disable All</span>
                          <Switch className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 ml-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!joke</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!8ball</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">!flip</div>
                          <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="moderation" className="mt-4">
                <Card className="bg-discord-darker border-gray-700">
                  <CardHeader>
                    <CardTitle>Moderation Settings</CardTitle>
                    <CardDescription className="text-discord-light">
                      Configure automatic moderation features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Anti-Spam Protection</Label>
                        <p className="text-sm text-discord-light">Automatically timeout users who spam messages</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-discord-blurple" />
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profanity Filter</Label>
                        <p className="text-sm text-discord-light">Automatically delete messages containing profanity</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Link Protection</Label>
                        <p className="text-sm text-discord-light">Delete messages with unauthorized links</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-discord-blurple" />
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Raid Protection</Label>
                        <p className="text-sm text-discord-light">Enable additional security during mass joins</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-discord-blurple" />
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="log-channel">Moderation Log Channel</Label>
                      <select id="log-channel" className="w-full rounded bg-discord-dark border border-gray-700 p-2 text-discord-light">
                        <option value="">Select a channel</option>
                        <option value="mod-logs">#mod-logs</option>
                        <option value="bot-logs">#bot-logs</option>
                        <option value="server-logs">#server-logs</option>
                      </select>
                      <p className="text-sm text-discord-light">
                        Channel where moderation actions will be logged
                      </p>
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

export default Configuration;
