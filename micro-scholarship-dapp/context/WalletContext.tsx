"use client";

import { useWallet } from "@/context/WalletContext";

export default function WalletConnect() {
  const {
    shortKey,
    isWalletConnected,
    isFreighterInstalled,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  return (
    <div className="border-b-[3px] border-black pb-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold uppercase font-mono">
        Micro Scholarship Platform
      </h1>

      {!isFreighterInstalled ? (
        // Freighter kurulu değilse install linki gösteriyoruz
        <a
          href="https://www.freighter.app/"
          target="_blank"
          className="border-[3px] border-black px-6 py-2 uppercase font-mono bg-white"
        >
          Install Freighter
        </a>
      ) : isWalletConnected ? (
        <div className="flex items-center gap-4">
          {/* Bağlı public key */}
          <span className="font-mono uppercase">
            {shortKey}
          </span>

          <button
            onClick={disconnectWallet}
            className="border-[3px] border-black px-6 py-2 uppercase font-mono bg-white"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="border-[3px] border-black px-6 py-2 uppercase font-mono bg-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
