"use client";

import WalletConnect from "@/components/WalletConnect";
import ScholarshipCards from "@/components/ScholarshipCards";
import StatsDisplay from "@/components/StatsDisplay";
import ActivityFeed from "@/components/ActivityFeed";

export default function Home() {
  return (
    <main className="space-y-8">
      <WalletConnect />
      <ScholarshipCards />
      <StatsDisplay />
      <ActivityFeed />
    </main>
  );
}
