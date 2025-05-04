import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Ticket, Users } from "lucide-react";
import { useClubContext } from "../../context/ClubContext";
import TabNav from "../ui/TabNav";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({
  children,
  title = "Club President Dashboard",
}: MainLayoutProps) => {
  const { activeTab, setActiveTab } = useClubContext();

  const tabs = [
    {
      key: "members",
      label: "Member Management",
      icon: <Users className="h-5 w-5" />,
    },
    {
      key: "tickets",
      label: "Ticketing System",
      icon: <Ticket className="h-5 w-5" />,
    },
  ];

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey as "members" | "tickets");
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <TabNav
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
          className="px-6 bg-[#1e293b]"
        />
        <main className="flex-1 overflow-auto p-6 bg-[#0f172a]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
