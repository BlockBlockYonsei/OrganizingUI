import React, { useState } from "react";
import { Code, Home, Menu, Settings, Ticket, Users } from "lucide-react";
// import { useClubContext } from "../../context/ClubContext";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const { activeTab, setActiveTab } = useClubContext();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Members",
      path: "/member",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "NonMembers",
      path: "/non-member",
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      label: "Settings",
      path: "/",
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
      <div className="flex items-center p-4 border-b border-[#334155]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-400 hover:bg-[#334155] cursor-pointer hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div
          className={`${
            !isSidebarOpen && "hidden"
          } w-full flex items-center justify-center text-xl font-bold text-[#8b5cf6] cursor-pointer`}
        >
          <Code className="h-5 w-5 mr-2" />
          ClubDAO
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link to={item.path}>
            <button
              key={item.label}
              className={`flex items-center w-full p-3 rounded-md cursor-pointer ${
                // activeTab === item.key
                // true
                false
                  ? "bg-[#334155] text-white"
                  : "text-gray-400 hover:bg-[#334155] hover:text-white"
              }`}
            >
              {item.icon}
              <span className={`${!isSidebarOpen && "hidden"} ml-3`}>
                {item.label}
              </span>
            </button>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <UserProfile isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Sidebar;
