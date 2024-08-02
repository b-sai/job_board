import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { TopNavBar } from "components/TopNavBar";
import CollapsibleSidebarLayout from "resume-parser/SideBar";

export const metadata: Metadata = {
  title: "Rocket Jobs",
  description: "Find jobs tailored to your resume",
};

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <TopNavBar />
      <CollapsibleSidebarLayout
        sidebar={
          <div className="min-h-full p-4">
            <ResumeParser />
          </div>
        }
        main={
          <div className="min-h-full p-0">
            <JobSearchCard />
          </div>
        }
      />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
