"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import JobCard from "../../job-board/JobCard";
import { apiWrapper } from "../../../utils/apiWrapper";
import { TopNavBar } from "components/TopNavBar";
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

const JobPage: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const jobDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await apiWrapper(`/job/${id}/`, "GET");
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const customComponents = {
    h1: ({ ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h3 className="mb-2 text-xl font-semibold" {...props} />
    ),
    h2: ({ ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h4 className="mb-2 text-lg font-semibold" {...props} />
    ),
    p: ({ ...props }: React.HTMLProps<HTMLParagraphElement>) => (
      <p className="mb-4" {...props} />
    ),
    ul: ({ ...props }: React.HTMLProps<HTMLUListElement>) => (
      <ul className="mb-4 list-disc pl-5" {...props} />
    ),
    li: ({ ...props }: React.HTMLProps<HTMLLIElement>) => (
      <li className="mb-1" {...props} />
    ),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopNavBar />
      <div className="mx-auto w-full lg:w-2/3">
        <JobCard
          loading={loading}
          selectedJob={job}
          customComponents={customComponents}
          jobDetailsRef={jobDetailsRef}
          setAppliedJobs={() => {}}
        />
      </div>
    </div>
  );
};

export default JobPage;
