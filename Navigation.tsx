import { FC } from "react";
import { Link } from "wouter";

const Navigation: FC = () => {
  return (
    <header className="bg-discord-dark border-b border-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <a className="text-discord-blurple font-bold text-2xl flex items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 mr-2"
            >
              <path d="M16 18l2-2-2-2" />
              <path d="M18 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3" />
            </svg>
            DiscordBot
          </a>
        </Link>
        <div className="text-discord-light text-sm border-l border-gray-700 pl-4">
          Dashboard
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <a
          href="#"
          className="text-discord-light hover:text-discord-lightest transition"
        >
          Documentation
        </a>
        <a
          href="#"
          className="text-discord-light hover:text-discord-lightest transition"
        >
          Support
        </a>
        <div className="bg-discord-blurple text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition cursor-pointer">
          Add to Server
        </div>
      </div>
    </header>
  );
};

export default Navigation;
