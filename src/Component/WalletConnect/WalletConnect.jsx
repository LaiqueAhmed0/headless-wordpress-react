import { useAppKit, useDisconnect , useAppKitAccount } from "@reown/appkit/react";

export default function App() {
  const modal = useAppKit();
  const { address, caipAddress, isConnected } = useAppKitAccount();

  return (
    <>
      {isConnected ? <appkit-account-button /> : <button id="set-btn-1" onClick={() => modal.open()}>
        Connect Wallet
      </button>}
      
    </>
  );
}
