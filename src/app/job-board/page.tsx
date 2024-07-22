"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import JobLevelFilter from "./Filters";
import StateFilter from "./StateFilter";
import { useResume } from "ResumeContext";
import LoadingCard from "./loadingcard";
import DetailedLoadingCard from "./loading";
import ReactMarkdown from "react-markdown";
import DateFilter from "./DateFilter";

interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url_direct?: string;
  date_posted?: string;
  location?: string;
}

const JobSearchCard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [datePosted, setDatePosted] = useState(1);
  const { resume, setPositions } = useResume();

  useEffect(() => {
    fetchJobs();
  }, [selectedLevels, selectedLocations, currentPage, datePosted]);
  useEffect(() => {
    if (resume && resume !== "null" && resume !== null) {
      fetchJobs();
    }
  }, [resume]);

  const fetchJobs = async () => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      setLoading(true);
      // Create FormData object for both query parameters and file
      const formData = new FormData();

      // Add query parameters to FormData
      formData.append("skip", skip.toString());
      formData.append("limit", itemsPerPage.toString());
      formData.append("dateset", datePosted.toString());

      if (selectedLevels?.length > 0) {
        selectedLevels.forEach((level) => formData.append("job_level", level));
      }

      if (selectedLocations?.length > 0) {
        selectedLocations.forEach((location) =>
          formData.append("locations", location)
        );
      }

      // Add resume file if available
      if (resume instanceof File) {
        formData.append("resume", resume, resume.name);
        console.log("Appending resume file:", resume.name);
      } else {
        console.log("No resume file to append");
      }

      console.log("Sending request to:", `${baseUrl}jobs/`);

      const response = await fetch(`${baseUrl}jobs/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.jobs);
      setTotalCount(data.total_count);
      setLoading(false);
      setPositions(data.positions);
      console.log(data.jobs.length, "data");
      if (data.jobs.length > 0) {
        setSelectedJob(data.jobs[0]);
      } else {
        setSelectedJob(null);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Error fetching jobs. Please try again later.");
      setLoading(false);
    }
  };
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setLoading(true);
  };

  const handleLevelFilterChange: Dispatch<SetStateAction<string[]>> = (
    levels
  ) => {
    setSelectedLevels(levels);
    setCurrentPage(1); // Reset to first page
  };

  const handleLocationFilterChange: Dispatch<SetStateAction<string[]>> = (
    locations
  ) => {
    setSelectedLocations(locations);
    setCurrentPage(1); // Reset to first page
  };

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
  console.log(selectedJob, "selectedJob");
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  return (
    <div className="container mx-auto flex h-[calc(100vh-80px)] flex-col p-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="sm:w-1/5">
          <JobLevelFilter
            selectedLevels={selectedLevels}
            setSelectedLevels={handleLevelFilterChange}
          />
        </div>
        <div className="sm:w-1/6">
          <DateFilter datePosted={datePosted} setDatePosted={setDatePosted} />
        </div>
        <div className="w-full sm:w-3/5">
          <StateFilter
            selectedLocations={selectedLocations}
            setSelectedLocations={handleLocationFilterChange}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow lg:flex-row lg:gap-6">
        <div className="w-full overflow-y-auto border-b lg:w-1/3 lg:border-b-0 lg:border-r">
          {loading
            ? Array(10)
                .fill(null)
                .map((_, index) => <LoadingCard key={index} />)
            : jobs.map((job) => (
                <div
                  key={job.id}
                  className={`cursor-pointer border-l-4 p-4 transition-all duration-300 ${
                    selectedJob?.id === job.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-transparent hover:bg-gray-50"
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <h3 className="pb-1 font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-black-600 text-sm">{job.company}</p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
              ))}
        </div>
        <div className="w-full overflow-y-auto py-4 pl-0 pr-4 lg:w-2/3">
          {loading ? (
            <DetailedLoadingCard />
          ) : selectedJob ? (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                {selectedJob.title}
              </h2>
              <p className="mb-4 text-lg text-gray-600 sm:text-xl">
                {selectedJob.company}
              </p>
              <p className="mb-4 text-sm text-gray-600">
                {selectedJob.date_posted} • {selectedJob.location}
              </p>
              <button
                onClick={() =>
                  window.open(selectedJob.job_url_direct, "_blank")
                }
                className="mb-4 rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-600"
              >
                Apply Now
              </button>
              <div className="rounded-lg bg-gray-50 p-4">
                <ReactMarkdown components={customComponents}>
                  {selectedJob.description || "No description available"}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-lg text-gray-500">
                No Jobs Match Selected Filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchCard;
