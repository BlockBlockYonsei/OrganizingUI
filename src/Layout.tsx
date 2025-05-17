import { ReactNode } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={"BlockBlock Yonsei"} />
        <main className="flex-1 overflow-auto p-6 bg-[#0f172a]">
          {children}
        </main>
      </div>
    </div>
  );
}
