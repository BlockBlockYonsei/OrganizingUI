import React, { useState } from "react";
import { Code, Home, Menu, Settings, Ticket, Users } from "lucide-react";
import { useClubContext } from "../../context/ClubContext";
import UserProfile from "./UserProfile";

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { activeTab, setActiveTab } = useClubContext();

  const navItems: NavItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      key: "members",
      label: "Members",
      icon: <Users className="h-5 w-5" />,
      onClick: () => setActiveTab("members"),
    },
    {
      key: "tickets",
      label: "Tickets",
      icon: <Ticket className="h-5 w-5" />,
      onClick: () => setActiveTab("tickets"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-[#1e293b] border-r border-[#334155] transition-all duration-300 flex flex-col`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-[#334155]">
        {isSidebarOpen && (
          <div className="flex items-center text-xl font-bold text-[#8b5cf6]">
            <Code className="h-5 w-5 mr-2" />
            ClubDAO
          </div>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-400 hover:bg-[#334155] hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`flex items-center w-full p-3 rounded-md ${
              activeTab === item.key
                ? "bg-[#334155] text-white"
                : "text-gray-400 hover:bg-[#334155] hover:text-white"
            }`}
            onClick={item.onClick}
          >
            {item.icon}
            {isSidebarOpen && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <UserProfile isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Sidebar;
