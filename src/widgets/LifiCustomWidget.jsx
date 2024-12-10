import { useEffect } from "react";
import { LiFiWidget } from "@lifi/widget";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, polygon, bsc } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const widgetConfig = {
  fee: 0.005,
  theme: {
    palette: {
      primary: {
        main: "#00ffe9cc",
      },
      secondary: {
        main: "#00c3e1",
      },
      background: {
        default: "#1b1f26",
        paper: "#00ffe9cc",
      },
      text: {
        primary: "#fff",
        secondary: "#fff",
      },
      grey: {
        200: "#eeeeee",
        300: "#fff",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
    container: {
      boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
      borderRadius: "16px",
    },
  },
  integratorAddress: {
    EVM: "0x79Da4eeE178FbbE33c085626a073AdbCb2ca579c",
    SOLANA: "6sFsu1iEvbpzBUjvmzN5NmnLkqjn9201U91thq2NeDLE",
  },
};
const projectId = "2a2a5978a58aad734d13a2d194ec469a";

// Setup wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, polygon, bsc],
});

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, polygon],
  metadata: {
    name: "Degens",
    description: "Degens",
    url: "https://degens.scoopsolutions.us/",
    icons: [],
  },
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
});

function LifiCustomWidget() {
  useEffect(() => {
    const parentElement = document.querySelectorAll(".MuiContainer-root")[0];
    const childElements = parentElement.getElementsByTagName("p");

    Array.from(childElements).forEach((element) => {
      if (element.innerText?.toLowerCase()?.includes("powered by")) {
        const aParent = element.closest("a");
        if (aParent) {
          aParent.remove();
        }
      }
    });
  }, []);

  return (
    <>
      <LiFiWidget integrator="dapp_degens" config={widgetConfig} />
    </>
  );
}

export default LifiCustomWidget;
