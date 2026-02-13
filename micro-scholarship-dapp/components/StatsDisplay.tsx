"use client";

import { useEffect, useState } from "react";
import {
  getTotalScholar,
  getTotalProject,
} from "@/lib/contract";

export default function StatsDisplay() {
  const [scholar, setScholar] = useState(0);
  const [project, setProject] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const s = await getTotalScholar();
      const p = await getTotalProject();
      setScholar(s);
      setProject(p);
    }

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="border-[3px] border-black p-6 bg-white">
        Total Scholar: {scholar}
      </div>

      <div className="border-[3px] border-black p-6 bg-white">
        Total Project: {project}
      </div>
    </div>
  );
}
