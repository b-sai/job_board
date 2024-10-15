// app/job/[id]/page.tsx

import JobCard from "../../job-board/JobCard";
import { apiWrapper } from "../../../utils/apiWrapper";
import { TopNavBar } from "components/TopNavBar";
import { Metadata } from "next";
import JobCardClient from "./jobCardClient";
import Job from "../../../app/job-board/jobs";


export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description || "",
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description
        ? job.description.substring(0, 300).replace(/\n/g, " ") + "..."
        : "",
      images: [
        {
          url: job.image_url || "",
          width: 100,
          height: 100,
          alt: `${job.company} logo`,
        },
      ],
      url: `https://www.rocketjobs.app/job/${job.id}`,
      type: "website",
      siteName: "Rocket Jobs",
    },
    twitter: {
      card: "summary_large_image",
      site: "@rocketjobs",
      creator: "@rocketjobs",
    },
  };
}

async function getJob(id: string): Promise<Job | null> {
  try {
    const job = await apiWrapper(`/job/${id}/`, "GET");
    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  if (!job) {
    return <div>Job not found.</div>;
  }

  return <JobCardClient />;
  }
