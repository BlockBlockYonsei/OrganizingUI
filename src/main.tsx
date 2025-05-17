import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./Routers.tsx";
import { Toaster } from "sonner";

const { networkConfig } = createNetworkConfig({
  // localnet: { url: getFullnodeUrl("localnet") },
  // mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: "https://rpc-testnet.suiscan.xyz:443" },
});
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect={true}>
          <Routers></Routers>
          <Toaster expand={true} richColors />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>
);
