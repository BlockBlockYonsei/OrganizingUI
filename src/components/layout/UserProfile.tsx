import React from "react";
import { Crown, LogOut, User } from "lucide-react";
// import { useWalletContext } from "../../context/WalletContext";
import Button from "../ui/Button2";

interface UserProfileProps {
  isSidebarOpen: boolean;
}

const UserProfile = ({ isSidebarOpen }: UserProfileProps) => {
  // const { account, disconnect } = useWalletContext();

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
              {/* {account?.label || account?.address?.slice(0, 8) + "..."} */}
            </p>
            <div className="flex items-center text-xs text-[#a78bfa]">
              <Crown className="h-3 w-3 mr-1" />
              <span>President</span>
            </div>
          </div>
        )}
      </div>
      {isSidebarOpen && (
        <Button
          variant="secondary"
          fullWidth
          className="mt-4"
          icon={<LogOut className="h-4 w-4" />}
          // onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
