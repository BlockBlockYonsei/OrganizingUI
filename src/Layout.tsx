import { ReactNode } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { Ticket, Users } from "lucide-react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
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
  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={"BlockBlock Yonsei"} />
        {/* <TabNav
          tabs={tabs}
          // activeTab={activeTab}
          activeTab={""}
          onChange={handleTabChange}
          className="px-6 bg-[#1e293b]"
        /> */}
        <main className="flex-1 overflow-auto p-6 bg-[#0f172a]">
          {children}
        </main>
      </div>
    </div>
  );
}
