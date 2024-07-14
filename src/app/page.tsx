import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Filters from "job-board/Filters";
export default function Home() {
  return (
    <html>
      <body>
        <ResumeParser />
        <JobSearchCard />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
