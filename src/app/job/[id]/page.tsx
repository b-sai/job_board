// app/job/[id]/page.tsx

import JobCard from "../../job-board/JobCard";
import { apiWrapper } from "../../../utils/apiWrapper";
import { TopNavBar } from "components/TopNavBar";
import { Metadata } from "next";
import JobCardClient from "./jobCardClient";

interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url_final?: string;
  date_posted?: string;
  location?: string;
  score?: number;
  image_url?: string;
  min_amount?: number;
  max_amount?: number;
}

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
      description: job.description || "",
      images: [{ url: job.image_url || "" }],
      url: `https://www.rocketjobs.app/job/${job.id}`,
      type: "website",
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
