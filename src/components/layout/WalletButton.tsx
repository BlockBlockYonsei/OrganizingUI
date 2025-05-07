import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function WalletButton() {
  const account = useCurrentAccount();
  const wallets = useWallets();

  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();

  return (
    <div>
      {account ? (
        <Button
          className="w-full mt-4 bg-[#334155] text-gray-200 hover:bg-[#475569] focus:ring-[#334155] border border-transparent cursor-pointer"
          onClick={() => disconnect()}
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      ) : (
        <Button
          className="w-full mt-4 bg-[#334155] text-gray-200 hover:bg-[#475569] focus:ring-[#334155] border border-transparent cursor-pointer"
          onClick={() => connect({ wallet: wallets[0] })}
        >
          <LogOut className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
