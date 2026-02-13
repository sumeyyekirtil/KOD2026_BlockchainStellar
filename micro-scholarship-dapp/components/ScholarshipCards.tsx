"use client";

import { useState } from "react";
import { fundScholar, fundProject } from "@/lib/contract";
import { useWallet } from "@/context/WalletContext";

export default function ScholarshipCards() {
  const { isWalletConnected } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleScholar = async () => {
    try {
      setLoading(true);
      await fundScholar();
      console.log("Scholar funded");
      window.location.reload();
    } catch (err) {
      alert("Transaction failed or rejected.");
    } finally {
      setLoading(false);
    }
  };

  const handleProject = async () => {
    try {
      setLoading(true);
      await fundProject();
      console.log("Project funded");
      window.location.reload();
    } catch (err) {
      alert("Transaction failed or rejected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <button
        disabled={!isWalletConnected || loading}
        onClick={handleScholar}
        className="border-[3px] border-black p-6 bg-white uppercase font-mono"
      >
        {loading ? "Processing..." : "Fund Scholar"}
      </button>

      <button
        disabled={!isWalletConnected || loading}
        onClick={handleProject}
        className="border-[3px] border-black p-6 bg-white uppercase font-mono"
      >
        {loading ? "Processing..." : "Fund Project"}
      </button>
    </div>
  );
}
