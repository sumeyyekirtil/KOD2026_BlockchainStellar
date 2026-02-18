"use client";

import { useState } from "react";
import { createTestAccount } from "../lib/stellar";
import GMButton from "./components/GMButton";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [secretKey, setSecretKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const handleCreateWallet = async () => {
    try {
      addLog("⏳ Creating Stellar test account...");

      const pair = await createTestAccount();

      setSecretKey(pair.secret());
      setPublicKey(pair.publicKey());

      addLog("✅ Account created!");
      addLog("Public Key: " + pair.publicKey());
    } catch {
      addLog("❌ Wallet creation failed");
    }
  };

  return (
    <main className="container">
      <h1 className="title">Micro Scholarship DApp</h1>

      <button className="button primary" onClick={handleCreateWallet}>
        Create Test Wallet
      </button>

      {secretKey && publicKey && (
        <GMButton
          addLog={addLog}
          secretKey={secretKey}
          publicKey={publicKey}
        />
      )}

      <div className="log-box">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </main>
  );
}