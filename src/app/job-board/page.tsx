"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import JobLevelFilter from "./Filters";
import { fetchData } from "./FetchData";
import StateFilter from "./StateFilter";
import { useResume } from "ResumeContext";

interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url?: string;
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
  const { resume } = useResume();

  useEffect(() => {
    fetchJobs();
  }, [selectedLevels, selectedLocations, currentPage]);
  useEffect(() => {
    if (resume && resume !== "null" && !Array.isArray(resume)) {
      fetchJobs();
    }
  }, [resume]);

  const fetchJobs = async () => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const resData = resume ? resume.workExperiences[0].descriptions : null;
      const data = await fetchData("jobs/", {
        job_level: selectedLevels,
        locations: selectedLocations,
        resume: resData,
      });
      setJobs(data.jobs);
      setTotalCount(data.total_count);
      setLoading(false);
      setSelectedJob(data.jobs[0]);
    } catch (err) {
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

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="mt-6 flex min-h-screen flex-col gap-6 bg-gray-50 p-6 md:mx-20">
      <div className="mt-1 flex flex-col sm:flex-row">
        <div className="sm:w-1/5">
          <JobLevelFilter
            selectedLevels={selectedLevels}
            setSelectedLevels={handleLevelFilterChange}
          />
        </div>
        <div className="sm:w-4/5">
          <StateFilter
            selectedLocations={selectedLocations}
            setSelectedLocations={handleLocationFilterChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center">
        <div className="flex h-[calc(100vh-3rem)] w-full flex-col md:w-1/3">
          <h2 className="mb-4 flex-shrink-0 text-2xl font-bold text-gray-800">
            Open Positions
          </h2>
          <div className="flex-grow space-y-3 overflow-y-auto">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`transform cursor-pointer rounded-lg p-4 transition-all duration-300 ease-in-out ${
                  selectedJob?.id === job.id
                    ? "scale-102 border-l-4 border-blue-500 bg-white shadow-md"
                    : "hover:scale-102 bg-white hover:-translate-y-1 hover:shadow-md"
                }`}
                onClick={() => handleJobSelect(job)}
              >
                <h3 className="font-semibold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            ))}
          </div>
          {/* <div className="mt-4 flex justify-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-lg bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-lg bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400"
              >
                Next
              </button>
            )}
          </div> */}
        </div>
        <div className="h-[calc(100vh-3rem)] w-full overflow-y-auto md:w-2/3">
          {selectedJob ? (
            <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                {selectedJob.title}
              </h2>
              <p className="mb-4 text-xl text-gray-600">
                {selectedJob.company}
              </p>
              <button
                onClick={() => window.open(selectedJob.job_url, "_blank")}
                className="mb-4 rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md "
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
            <div className="flex h-full items-center justify-center rounded-lg bg-white p-6 shadow-md">
              <p className="text-lg text-gray-500">
                Select a job to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchCard;
