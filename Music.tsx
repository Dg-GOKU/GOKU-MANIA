import { FC, useState } from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import CommandsList from "@/components/CommandsList";
import CommandInfoModal from "@/components/CommandInfoModal";
import { Command } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Music: FC = () => {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [commandModalOpen, setCommandModalOpen] = useState(false);

  const handleCommandSelect = (command: Command) => {
    setSelectedCommand(command);
    setCommandModalOpen(true);
  };

  // Mock current song data for demonstration
  const currentSong = {
    title: "Rick Astley - Never Gonna Give You Up",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
    duration: "3:32",
    currentTime: "0:32",
    progress: 15,
    requester: "User123",
  };

  // Mock queue data for demonstration
  const queue = [
    { title: "Daft Punk - One More Time", duration: "3:50", requester: "DJ_Fan" },
    { title: "Toto - Africa", duration: "4:55", requester: "MusicLover" },
    { title: "Queen - Bohemian Rhapsody", duration: "5:55", requester: "ClassicRocker" },
  ];

  return (
    <>
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-discord bg-discord-dark">
          <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Music Player</h1>
              <div className="space-x-2">
                <Button variant="outline" className="border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
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
                  Add to Queue
                </Button>
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
                    <circle cx="5.5" cy="17.5" r="2.5" />
                    <circle cx="18.5" cy="17.5" r="2.5" />
                    <path d="m5.5 15 13-3V6l-13 3Z" />
                  </svg>
                  Join Voice Channel
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-1 mb-8">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Now Playing</CardTitle>
                  <CardDescription className="text-discord-light">
                    Currently streaming music in voice channel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-discord-dark rounded-md flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-red-500"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{currentSong.title}</div>
                      <div className="mt-2">
                        <Progress value={currentSong.progress} className="h-2 bg-discord-dark" />
                        <div className="flex justify-between mt-2 text-xs text-discord-light">
                          <span className="text-discord-blurple">{currentSong.currentTime}</span>
                          <span>{currentSong.duration}</span>
                        </div>
                      </div>
                      <div className="text-xs text-discord-light mt-2">
                        Requested by: {currentSong.requester}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-2 mt-6">
                    <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="m12 8-9 4 9 4 9-4-9-4z" />
                        <path d="M12 16v4" />
                        <path d="M8 12v4" />
                        <path d="M16 12v4" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <polygon points="19 20 9 12 19 4 19 20" />
                        <line x1="5" x2="5" y1="19" y2="5" />
                      </svg>
                    </Button>
                    <Button size="sm" className="rounded-full w-12 h-12 p-0 bg-discord-blurple hover:bg-opacity-80">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <polygon points="5 4 15 12 5 20 5 4" />
                        <line x1="19" x2="19" y1="5" y2="19" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Current Queue</CardTitle>
                  <CardDescription className="text-discord-light">
                    Upcoming songs in the playlist
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {queue.map((song, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center bg-discord-dark rounded mr-3 text-discord-light">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{song.title}</div>
                            <div className="text-xs text-discord-light">Requested by: {song.requester}</div>
                          </div>
                        </div>
                        <div className="text-xs text-discord-light">{song.duration}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between w-full">
                    <div className="text-sm text-discord-light">3 songs in queue</div>
                    <Button variant="outline" size="sm" className="border-gray-700 text-discord-light hover:bg-discord-dark hover:text-white">
                      Clear Queue
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="bg-discord-darker border-gray-700">
                <CardHeader>
                  <CardTitle>Music Statistics</CardTitle>
                  <CardDescription className="text-discord-light">
                    Overview of your server's music usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-discord-light">Total Songs Played</p>
                        <p className="text-2xl font-bold">523</p>
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
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-discord-light">Time Played</p>
                        <p className="text-2xl font-bold">42.5 hrs</p>
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
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="pt-2">
                      <p className="text-sm text-discord-light mb-3">Most Played Songs</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Never Gonna Give You Up</span>
                          <span className="text-discord-light">42 plays</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Despacito</span>
                          <span className="text-discord-light">28 plays</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Gangnam Style</span>
                          <span className="text-discord-light">21 plays</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <CommandsList category="music" onCommandSelect={handleCommandSelect} />
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

export default Music;
