import { useGetExecutiveMemberCap } from "@/hooks/member-caps";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Crown, Moon } from "lucide-react";

interface HeaderProps {
  title: string;
  role?: string;
}

const Header = ({ title }: HeaderProps) => {
  const account = useCurrentAccount();
  const { currentClubExecutiveMemberCaps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });

  return (
    <header className="bg-[#1e293b] border-b border-[#334155] py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-white">{title}</h1>

        {currentClubExecutiveMemberCaps &&
          currentClubExecutiveMemberCaps.map((cap) => (
            <div className="ml-4 flex">
              <div className="flex items-center rounded-md bg-[#6d28d9] px-3 py-1 text-sm text-white">
                <Crown className="h-4 w-4 mr-1" />
                <span>{cap.member_type}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#334155]">
            <Moon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
