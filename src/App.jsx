import React from "react";
import "./App.css";
import Routing from "./Component/Routing/Routing";
import { createAppKit, useAppKitTheme } from "@reown/appkit/react";
import { mainnet, polygon, bsc } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = "2a2a5978a58aad734d13a2d194ec469a";
if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, polygon, bsc],
});

createAppKit({
  debug: true,
  adapters: [wagmiAdapter],
  networks: [mainnet, polygon],
  metadata: {
    name: "Degens",
    description: "Degens",
    url: "https://degens.scoopsolutions.us/",
    icons: [],
    universalLink: "https://degens.scoopsolutions.us/",
  },
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
  walletConnectVersion: 2,
});


function App() {
  const { themeMode, themeVariables, setThemeMode, setThemeVariables } = useAppKitTheme()
  setThemeMode('dark')
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
