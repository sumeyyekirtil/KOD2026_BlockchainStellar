"use client";

import { sendXLM } from "../../lib/stellar";

type Props = {
  addLog: (message: string) => void;
  secretKey: string;
  publicKey: string;
};

export default function GMButton({
  addLog,
  secretKey,
  publicKey,
}: Props) {
  const handleGM = async () => {
    try {
      addLog("⏳ Sending 1 XLM to yourself...");

      const hash = await sendXLM(secretKey, publicKey, "1");

      addLog("✅ Transaction Success!");
      addLog("TX Hash: " + hash);
    } catch {
      addLog("❌ Transaction failed");
    }
  };

  return (
    <button className="button success" onClick={handleGM}>
      Send 1 XLM (GM)
    </button>
  );
}