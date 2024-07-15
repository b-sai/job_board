"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import JobLevelFilter from "./Filters";
import { fetchData } from "./FetchData";
import StateFilter from "./StateFilter";
import Pagination from "./Pagination";
import JobDetails from "./JobDetails";

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

  useEffect(() => {
    fetchJobs();
  }, [selectedLevels, selectedLocations, currentPage]);

  const fetchJobs = async () => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const data = await fetchData("jobs/", {
        job_level: selectedLevels,
        locations: selectedLocations,
        skip,
        limit: itemsPerPage,
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

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="mt-6 flex min-h-screen flex-col gap-6 bg-gray-50 p-6 md:mx-20">
      <div className="mt-1 flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <JobLevelFilter
            selectedLevels={selectedLevels}
            setSelectedLevels={handleLevelFilterChange}
          />
        </div>
        <div className="sm:w-2/3">
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
        <JobDetails selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default JobSearchCard;
