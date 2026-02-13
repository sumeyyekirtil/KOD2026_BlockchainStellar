"use client";

import { useState } from "react";

export default function ActivityFeed() {
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <div className="border-t-[3px] border-black pt-4 font-mono">
      <h2 className="uppercase">Recent Activity</h2>
      {logs.length === 0 && (
        <p>No activity yet (real tx visible in Stellar Explorer)</p>
      )}
    </div>
  );
}
