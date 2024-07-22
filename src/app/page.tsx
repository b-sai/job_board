import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rocket Jobs",
  description: "Find jobs tailored to your resume",
};

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <main className="flex flex-grow overflow-hidden">
          <div className="w-1/4 min-w-[20%] max-w-xs border-r p-4">
            <ResumeParser />
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <JobSearchCard />
          </div>
        </main>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
