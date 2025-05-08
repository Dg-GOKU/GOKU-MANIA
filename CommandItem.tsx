import { FC } from "react";
import { Command } from "@shared/schema";

interface CommandItemProps {
  command: Command;
  onClick: () => void;
}

const CommandItem: FC<CommandItemProps> = ({ command, onClick }) => {
  const { name, description, usage, permissions, examples = [] } = command;
  const prefix = "!"; // We'd typically get this from context or props

  // Parse usage to highlight parts
  const usageParts = usage.split(" ");
  const commandName = usageParts[0];
  const args = usageParts.slice(1);

  return (
    <div className="p-4 hover:bg-gray-800 transition cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-2">
        <div className="font-medium">{name.charAt(0).toUpperCase() + name.slice(1)}</div>
        {permissions && (
          <div className="text-xs px-2 py-0.5 bg-discord-darker rounded-full text-discord-light">
            Requires Permission: {permissions}
          </div>
        )}
      </div>
      <div className="text-discord-light text-sm mb-3">
        {description}
      </div>
      <div className="bg-gray-800 p-3 rounded font-mono text-sm">
        <span className="text-discord-pink">{prefix}</span>
        <span className="text-discord-green">{commandName}</span>
        {args.map((arg, index) => {
          // Check if argument is optional (wrapped in [])
          const isOptional = arg.startsWith('[') && arg.endsWith(']');
          return (
            <span key={index} className={`${isOptional ? 'text-discord-light' : 'text-discord-yellow'}`}>
              {" "}{arg}
            </span>
          );
        })}
      </div>
      
      {examples.length > 0 && (
        <div className="mt-3 flex">
          <div className="bg-discord-dark p-2 rounded-l">
            <span className="text-discord-pink">{prefix}</span>
            <span className="text-discord-green">{examples[0].split(' ')[0]}</span>
            <span className="text-discord-yellow"> {examples[0].split(' ').slice(1).join(' ')}</span>
          </div>
          <div className="bg-green-900 bg-opacity-30 text-green-300 p-2 rounded-r text-xs flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 mr-1"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Example
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandItem;
