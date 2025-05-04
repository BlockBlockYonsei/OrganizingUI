import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import {
  useGetExecutiveMemberCap,
  useGetMemberCap,
} from "./hooks/executive-member";
import Tae from "./Tae";

function App() {
  const account = useCurrentAccount();
  const wallets = useWallets();

  const { caps: eMemberCap } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });
  const { caps: memberCap } = useGetMemberCap({
    owner: account ? account.address : "",
  });

  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();

  useEffect(() => {
    console.log("e caps", eMemberCap);
  }, [eMemberCap]);

  useEffect(() => {
    console.log("normal caps", memberCap);
  }, [memberCap]);

  return (
    <>
      <div>
        <nav>
          {account ? (
            <div className="flex flex-col items-center">
              <p className="text-center text-lg font-bold">{account.label}</p>
              <Button
                className="w-45 bg-black text-white hover:bg-blue-200"
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="mx-auto w-5/6">
              <Button
                className="w-45 border-2 border-black bg-white text-black hover:bg-blue-200"
                onClick={() => connect({ wallet: wallets[0] })}
              >
                Connect wallet
              </Button>
            </div>
          )}
        </nav>
      </div>
      {/* </div> */}
      <Tae></Tae>
    </>
  );
}

export default App;
