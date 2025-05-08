import { FC, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GuildSettings } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface WelcomeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  guildId: string;
}

const WelcomeMessageModal: FC<WelcomeMessageModalProps> = ({
  isOpen,
  onClose,
  guildId,
}) => {
  const { toast } = useToast();
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [welcomeChannel, setWelcomeChannel] = useState<string>("");
  const [welcomeEnabled, setWelcomeEnabled] = useState<boolean>(true);

  // Load current settings
  const { data: settings, isLoading } = useQuery({
    queryKey: [`/api/guild-settings/${guildId}`],
    enabled: isOpen,
  });

  // Update settings when data is loaded
  useEffect(() => {
    if (settings) {
      setWelcomeMessage(settings.welcomeMessage || "");
      setWelcomeChannel(settings.welcomeChannelId || "");
      setWelcomeEnabled(settings.welcomeEnabled || false);
    }
  }, [settings]);

  // Mutation to update welcome settings
  const updateSettings = useMutation({
    mutationFn: (newSettings: Partial<GuildSettings>) => 
      apiRequest("PATCH", `/api/guild-settings/${guildId}`, newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/guild-settings/${guildId}`] });
      toast({
        title: "Settings updated",
        description: "Welcome message settings have been saved.",
      });
      onClose();
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
      welcomeMessage,
      welcomeChannelId: welcomeChannel,
      welcomeEnabled,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-discord-dark rounded-lg w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Configure Welcome Message</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-discord-light hover:text-discord-lightest"
          >
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
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading settings...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-discord-light text-sm mb-2">
                Message Template
              </label>
              <Textarea
                className="w-full bg-discord-darker text-discord-lightest p-3 rounded border border-gray-700 focus:border-discord-blurple focus:outline-none"
                rows={4}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
              <div className="text-xs text-discord-light mt-1">
                Available variables: {"{user}"}, {"{server}"}, {"{memberCount}"}
              </div>
            </div>

            <div>
              <label className="block text-discord-light text-sm mb-2">
                Welcome Channel
              </label>
              <Select
                value={welcomeChannel}
                onValueChange={setWelcomeChannel}
              >
                <SelectTrigger className="w-full bg-discord-darker text-discord-lightest border border-gray-700">
                  <SelectValue placeholder="Select a channel" />
                </SelectTrigger>
                <SelectContent className="bg-discord-darker text-discord-lightest border border-gray-700">
                  <SelectItem value="welcome">#welcome</SelectItem>
                  <SelectItem value="general">#general</SelectItem>
                  <SelectItem value="introductions">#introductions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={welcomeEnabled}
                onCheckedChange={setWelcomeEnabled}
                className="data-[state=checked]:bg-discord-blurple"
              />
              <label className="text-discord-light cursor-pointer">
                Enable welcome messages
              </label>
            </div>

            <div className="bg-discord-darker p-4 rounded-lg border border-gray-700">
              <div className="text-sm mb-3">Preview</div>
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
                      .replace(/{memberCount}/g, "24")
                      .replace(/#rules/g, '<span class="text-discord-blurple">#rules</span>')
                      .replace(
                        /#introductions/g,
                        '<span class="text-discord-blurple">#introductions</span>'
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-4 py-2 rounded bg-discord-darker text-discord-light hover:text-discord-lightest transition"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={updateSettings.isPending}
            className="px-4 py-2 rounded bg-discord-blurple text-white hover:bg-opacity-80 transition"
          >
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessageModal;
