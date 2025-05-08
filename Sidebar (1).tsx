import { FC } from "react";
import { Link, useLocation } from "wouter";
import { useBotStatus } from "./BotContext";

interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({ href, icon, label, active }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={`flex items-center ${
            active
              ? "text-discord-lightest bg-discord-dark"
              : "text-discord-light hover:text-discord-lightest hover:bg-discord-dark"
          } rounded px-2 py-1.5 transition`}
        >
          <i className={`fas fa-${icon} mr-2`}></i>
          {label}
        </a>
      </Link>
    </li>
  );
};

const Sidebar: FC = () => {
  const [location] = useLocation();
  const { status, memberCount } = useBotStatus();

  return (
    <aside className="w-64 bg-discord-darker flex-shrink-0 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="text-sm text-discord-light mb-2">SERVER</div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-discord-dark rounded-full flex items-center justify-center mr-3">
            <i className="fas fa-server text-discord-blurple"></i>
          </div>
          <div>
            <div className="font-semibold">Awesome Server</div>
            <div className="text-xs text-discord-light">
              Online: {memberCount} members
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-discord p-4 space-y-6">
        <div>
          <div className="text-xs text-discord-light uppercase mb-2">
            General
          </div>
          <ul className="space-y-1">
            <SidebarLink
              href="/welcome"
              icon="hand-wave"
              label="Welcome"
              active={location === "/welcome"}
            />
            <SidebarLink
              href="/commands"
              icon="terminal"
              label="Commands"
              active={location === "/commands" || location === "/"}
            />
            <SidebarLink
              href="/server-management"
              icon="sliders"
              label="Server Management"
              active={location === "/server-management"}
            />
          </ul>
        </div>

        <div>
          <div className="text-xs text-discord-light uppercase mb-2">
            Command Categories
          </div>
          <ul className="space-y-1">
            <SidebarLink
              href="/moderation"
              icon="shield"
              label="Moderation"
              active={location === "/moderation"}
            />
            <SidebarLink
              href="/utility"
              icon="wrench"
              label="Utility"
              active={location === "/utility"}
            />
            <SidebarLink
              href="/fun"
              icon="gamepad"
              label="Fun"
              active={location === "/fun"}
            />
            <SidebarLink
              href="/music"
              icon="music"
              label="Music"
              active={location === "/music"}
            />
          </ul>
        </div>

        <div>
          <div className="text-xs text-discord-light uppercase mb-2">
            Settings
          </div>
          <ul className="space-y-1">
            <SidebarLink
              href="/configuration"
              icon="cog"
              label="Configuration"
              active={location === "/configuration"}
            />
            <SidebarLink
              href="/permissions"
              icon="lock"
              label="Permissions"
              active={location === "/permissions"}
            />
            <SidebarLink
              href="/logs"
              icon="list"
              label="Logs"
              active={location === "/logs"}
            />
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800 flex items-center">
        <div
          className={`w-8 h-8 ${
            status === "online" ? "bg-green-500" : "bg-red-500"
          } rounded-full flex items-center justify-center mr-3`}
        >
          <i className="fas fa-check text-white text-xs"></i>
        </div>
        <div>
          <div className="text-sm font-medium">Bot Status</div>
          <div
            className={`text-xs ${
              status === "online" ? "text-discord-green" : "text-discord-red"
            }`}
          >
            {status === "online" ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
