import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { TopNavBar } from "components/TopNavBar";

const MainApp = dynamic(() => import("./MainApp"), { ssr: false });

export const metadata: Metadata = {
  title: "Rocket Jobs",
  description: "Find jobs tailored to your resume",
};

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <TopNavBar />
      <MainApp />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
