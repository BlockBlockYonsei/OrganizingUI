import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import Bum from "./Bum";

function App() {
  const account = useCurrentAccount();
  const wallets = useWallets();

  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  useEffect(() => {
    // console.log("wallet", wallets);
    console.log("account", account?.chains);
  }, [wallets, account]);

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
      <Bum></Bum>
    </>
  );
}

export default App;
