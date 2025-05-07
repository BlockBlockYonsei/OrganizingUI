import { useEffect } from "react";
import {
  useCurrentAccount,
  useDisconnectWallet,
  useConnectWallet,
  useWallets,
} from "@mysten/dapp-kit";

/**
 * Custom hook for wallet connection functionality
 *
 * Provides all the necessary functions and state for wallet connection
 * Can be used independently of the WalletContext when needed
 */
const useWalletConnection = () => {
  const account = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connectWallet } = useConnectWallet();

  // Connect to the first available wallet
  const connect = () => {
    if (wallets.length > 0) {
      connectWallet({ wallet: wallets[0] });
    }
  };

  // Log wallet information when connection state changes
  useEffect(() => {
    if (account) {
      console.log("Connected account:", account.address);
      console.log("Connected chains:", account.chains);
    }
  }, [account]);

  return {
    account,
    wallets,
    connect,
    disconnect,
    isConnected: !!account,
  };
};

export default useWalletConnection;
