"use client";

import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import GMButton from "./components/GMButton";
import "./globals.css";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  return (
    <main className="container">
      <h1 className="title">🎓 Micro Scholarship DApp</h1>

      <div className="card">
        <WalletConnect addLog={addLog} />
      </div>

      <div className="card">
        <GMButton addLog={addLog} />
      </div>

      <div className="card log-card">
        <h3>Activity Log</h3>
        {logs.length === 0 && <p>No activity yet...</p>}
        {logs.map((log, index) => (
          <p key={index} className="log-item">
            {log}
          </p>
        ))}
      </div>
    </main>
  );
}
