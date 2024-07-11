import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
export default function Home() {
  return (
    <html className="demo">
      <body>
        <ResumeParser />
        <JobSearchCard />
      </body>
    </html>
  );
}
