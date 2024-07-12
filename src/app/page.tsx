import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
import { Analytics } from "@vercel/analytics/react";
export default function Home() {
  return (
    <html>
      <body>
        <ResumeParser />
        <JobSearchCard />
        <Analytics />
      </body>
    </html>
  );
}
