"use client";

import { useState } from "react";
import { Keypair } from "@stellar/stellar-sdk";
import { fundAccount, sendScholarship } from "@/lib/stellar";

type Props = {
  addLog: (message: string) => void;
};

export default function ScholarshipForm({ addLog }: Props) {
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      addLog("🎓 Processing scholarship...");

      const sender = Keypair.random();
      await fundAccount(sender.publicKey());

      const receiver = Keypair.random();
      await fundAccount(receiver.publicKey());

      const result = await sendScholarship(
        sender.secret(),
        receiver.publicKey(),
        amount
      );

      addLog("✅ Scholarship sent!");
      addLog("🔗 Hash: " + result.hash);

      setLoading(false);
    } catch (error) {
      addLog("❌ Error sending scholarship");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-black border border-gray-700 px-4 py-2 rounded-xl"
      />

      <button
        onClick={handleApply}
        disabled={loading}
        className="
          px-6 py-2
          rounded-xl
          bg-gradient-to-r from-purple-500 to-pink-600
          hover:scale-105
          transition
          shadow-lg
          shadow-purple-500/30
        "
      >
        {loading ? "Sending..." : "Apply"}
      </button>
    </div>
  );
}
