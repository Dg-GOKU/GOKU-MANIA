import { FC } from "react";
import { Command } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface CommandInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  command: Command | null;
}

const CommandInfoModal: FC<CommandInfoModalProps> = ({
  isOpen,
  onClose,
  command,
}) => {
  if (!isOpen || !command) return null;

  const prefix = "!"; // We'd typically get this from context or props

  // Parse usage to highlight parts
  const usageParts = command.usage.split(" ");
  const commandName = usageParts[0];
  const args = usageParts.slice(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-discord-dark rounded-lg w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Command Details</h3>
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

        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-lg font-semibold">
                {prefix}
                {command.name}
              </h4>
              {command.category === "moderation" && (
                <div className="text-xs px-2 py-0.5 bg-discord-red bg-opacity-20 rounded text-discord-red">
                  Admin Only
                </div>
              )}
            </div>
            <div className="text-discord-light text-sm mt-1">
              {command.description}
            </div>
          </div>

          <div>
            <div className="text-discord-light text-sm mb-2">Usage</div>
            <div className="bg-discord-darker p-3 rounded font-mono text-sm">
              <span className="text-discord-pink">{prefix}</span>
              <span className="text-discord-green">{commandName}</span>
              {args.map((arg, index) => {
                // Check if argument is optional (wrapped in [])
                const isOptional = arg.startsWith('[') && arg.endsWith(']');
                return (
                  <span
                    key={index}
                    className={`${
                      isOptional ? "text-discord-light" : "text-discord-yellow"
                    }`}
                  >
                    {" "}
                    {arg}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-discord-light text-sm mb-2">Parameters</div>
            <div className="space-y-2">
              {args.map((arg, index) => {
                // Extract parameter name from [param] or <param>
                const paramName = arg.replace(/[<\[\]>]/g, "");
                const isOptional = arg.startsWith("[") && arg.endsWith("]");

                return (
                  <div className="flex" key={index}>
                    <div
                      className={`w-24 ${
                        isOptional
                          ? "text-discord-light"
                          : "text-discord-yellow"
                      } text-sm`}
                    >
                      {arg}
                    </div>
                    <div className="text-sm">
                      {isOptional
                        ? `Optional ${paramName}`
                        : `Required ${paramName}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {command.permissions && (
            <div>
              <div className="text-discord-light text-sm mb-2">
                Required Permissions
              </div>
              <div className="text-sm">
                User must have the{" "}
                <span className="bg-discord-darker text-discord-yellow px-1 py-0.5 rounded">
                  {command.permissions}
                </span>{" "}
                permission to use this command.
              </div>
            </div>
          )}

          {command.examples && command.examples.length > 0 && (
            <div>
              <div className="text-discord-light text-sm mb-2">Examples</div>
              <div className="space-y-2">
                {command.examples.map((example, index) => (
                  <div className="bg-discord-darker p-2 rounded text-sm" key={index}>
                    <span className="text-discord-pink">{prefix}</span>
                    {example.split(" ").map((part, i) => (
                      <span
                        key={i}
                        className={
                          i === 0
                            ? "text-discord-green"
                            : "text-discord-yellow"
                        }
                      >
                        {i === 0 ? part : ` ${part}`}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-discord-light text-sm mb-2">Cooldown</div>
            <div className="text-sm">{command.cooldown} seconds per user</div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-4 py-2 rounded bg-discord-darker text-discord-light hover:text-discord-lightest transition"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommandInfoModal;
