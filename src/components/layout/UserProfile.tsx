import { useEffect } from "react";
import { Crown, User } from "lucide-react";
import WalletButton from "./WalletButton";
import { useGetExecutiveMemberCap, useGetMemberCap } from "@/hooks/members";
import { useCurrentAccount } from "@mysten/dapp-kit";

interface UserProfileProps {
  isSidebarOpen: boolean;
}

const UserProfile = ({ isSidebarOpen }: UserProfileProps) => {
  const account = useCurrentAccount();

  const { caps: eMemberCap } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });
  const { caps: memberCap } = useGetMemberCap({
    owner: account ? account.address : "",
  });

  useEffect(() => {
    console.log("e caps", eMemberCap);
  }, [eMemberCap]);

  useEffect(() => {
    console.log("normal caps", memberCap);
  }, [memberCap]);

  return (
    <div className="p-4 border-t border-[#334155]">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-[#6d28d9] flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
        {isSidebarOpen && (
          <div className="ml-3 max-w-[160px]">
            <p className="text-sm font-medium text-white truncate">
              {account && account.address}
            </p>
            <div className="flex items-center text-xs text-[#a78bfa]">
              <Crown className="h-3 w-3 mr-1" />
              <span>
                {eMemberCap[0] ? eMemberCap[0].member_type : "Loading..."}
              </span>
            </div>
          </div>
        )}
      </div>
      {isSidebarOpen && <WalletButton />}
    </div>
  );
};

export default UserProfile;
