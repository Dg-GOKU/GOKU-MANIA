import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import WelcomeMessageModal from "@/components/WelcomeMessageModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const Welcome: FC = () => {
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  // In a real application, you would get this from the selected server
  const guildId = "123456789";

  const { data: settings, isLoading } = useQuery({
    queryKey: [`/api/guild-settings/${guildId}`],
  });

  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Welcome Messages</h1>
              <Button 
                onClick={() => setWelcomeModalOpen(true)}
                className="bg-discord-blurple hover:bg-opacity-80"
              >
                Configure Welcome Message
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Current Welcome Message</CardTitle>
                  <CardDescription className="text-discord-light">
                    This message will be sent when a new member joins your server
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-discord-light">Loading...</p>
                    </div>
                  ) : settings?.welcomeEnabled ? (
                    <div className="bg-discord-dark p-4 rounded-lg border border-gray-700">
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
                            {settings?.welcomeMessage
                              .replace(/{user}/g, "@NewUser")
                              .replace(/{server}/g, "Awesome Server")
                              .replace(/{memberCount}/g, "24")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-discord-light">Welcome messages are disabled</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
                  <div className="text-sm text-discord-light">
                    Status: <span className={settings?.welcomeEnabled ? "text-discord-green" : "text-discord-red"}>
                      {settings?.welcomeEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="text-sm text-discord-light">
                    Channel: {settings?.welcomeChannelId ? `#${settings.welcomeChannelId}` : "Not set"}
                  </div>
                </CardFooter>
              </Card>

              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Welcome Message Tips</CardTitle>
                  <CardDescription className="text-discord-light">
                    How to create effective welcome messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Available Variables</h3>
                    <ul className="list-disc pl-5 text-sm text-discord-light space-y-1">
                      <li><code className="bg-discord-dark px-1 py-0.5 rounded">{"{user}"}</code> - Mentions the new user</li>
                      <li><code className="bg-discord-dark px-1 py-0.5 rounded">{"{server}"}</code> - Your server name</li>
                      <li><code className="bg-discord-dark px-1 py-0.5 rounded">{"{memberCount}"}</code> - Current member count</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Best Practices</h3>
                    <ul className="list-disc pl-5 text-sm text-discord-light space-y-1">
                      <li>Keep your message friendly and concise</li>
                      <li>Direct new members to important channels</li>
                      <li>Highlight any server rules or expectations</li>
                      <li>Consider using an embed for better visibility</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <WelcomeMessageModal
        isOpen={welcomeModalOpen}
        onClose={() => setWelcomeModalOpen(false)}
        guildId={guildId}
      />
    </>
  );
};

export default Welcome;
