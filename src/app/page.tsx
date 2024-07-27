import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { TopNavBar } from "components/TopNavBar";
export const metadata: Metadata = {
  title: "Rocket Jobs",
  description: "Find jobs tailored to your resume",
};

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <TopNavBar />
      <div className="flex flex-grow overflow-hidden">
        <div className="w-80 flex-shrink-0 overflow-y-auto border-r dark:border-gray-700">
          <div className="min-h-full p-4">
            <ResumeParser />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="min-h-full p-0">
            <JobSearchCard />
          </div>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}