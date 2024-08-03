"use client";

import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { useResume } from "ResumeContext";
import LoadingCard from "./loadingcard";
import "./customScrollBar.css"; // Add this import
import JobCard from "./JobCard";
import { useMediaQuery } from "react-responsive"; // Add this import
import PulsingLoadingComponent from "./FilterLoading";
import FilterGroup from "./FilterMain";

interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url_direct?: string;
  date_posted?: string;
  location?: string;
}
import { useFilter } from "FilterDataProvider";
const JobSearchCard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const {
    selectedLevels,
    selectedLocations,
    datePosted,
    setSelectedLevels,
    setSelectedLocations,
    setDatePosted,
  } = useFilter();
  const {
    resume,
    setPositions,
    selectedPositions,
    setSidebarOpen,
    setSelectedPositions,
  } = useResume();
  const jobListRef = useRef<HTMLDivElement>(null);
  const [isJobCardOpen, setIsJobCardOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { filterButtonClicked, setFilterButtonClicked } = useFilter();

  useEffect(() => {
    if (!isMobile) {
      fetchJobs();
    }
  }, [selectedLocations, currentPage, datePosted]);

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        fetchJobs();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [selectedLevels]);

  const [isResumeUpload, setIsResumeUpload] = useState(false);

  useEffect(() => {
    if (resume && resume !== "null" && resume !== null) {
      setIsResumeUpload(true);
      setSelectedPositions([0]);
      fetchJobs().then(() => {
        setIsResumeUpload(false);
      });
    }
  }, [resume]);

  useEffect(() => {
    if (!isMobile && selectedPositions.length > 0 && !isResumeUpload) {
      const timer = setTimeout(() => {
        fetchJobs();
      }, 700);

      return () => clearTimeout(timer);
    }

    console.log(selectedPositions);
  }, [selectedPositions]);

  useEffect(() => {
    if (filterButtonClicked) {
      fetchJobs();
    }
    setFilterButtonClicked(false);
  }, [filterButtonClicked]);


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
      if (selectedPositions.length > 0) {
        selectedPositions.forEach((position) =>
          formData.append("positions_to_filter", position.toString())
        );
      }

      if (resume instanceof File) {
        formData.append("resume", resume, resume.name);
        console.log("Appending resume file:", resume.name);
      } else {
        console.log("No resume file to append");
      }

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

  const jobDetailsRef = useRef<HTMLDivElement>(null);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) {
      setIsJobCardOpen(true);
    }
    if (jobDetailsRef.current) {
      jobDetailsRef.current.scrollTo(0, 0);
    }
  };
  const scrollToTop = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollTo(0, 0);
    }
    if (jobDetailsRef.current) {
      jobDetailsRef.current.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    if (jobs.length > 0) {
      scrollToTop();
    }
  }, [jobs]);

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
  const closeJobCard = () => {
    setIsJobCardOpen(false);
  };
  return (
    <div className="container mx-auto flex h-[calc(100vh-80px)] flex-col p-4">
      {!isMobile && (
        <div className="mb-6 flex flex-col gap-1 sm:flex-row">
          {loading ? <PulsingLoadingComponent /> : <FilterGroup />}
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:flex-row lg:gap-6">
        <div
          ref={jobListRef}
          className="custom-scrollbar w-full overflow-y-auto  lg:w-1/3 "
        >
          {loading
            ? Array(10)
                .fill(null)
                .map((_, index) => <LoadingCard key={index} />)
            : jobs.map((job) => (
                <div
                  key={job.id}
                  className={`cursor-pointer border-l-4 p-4 transition-all duration-300 ${
                    selectedJob?.id === job.id
                      ? "border-blue-500 bg-blue-50 dark:bg-slate-700"
                      : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <h3 className="pb-1 font-semibold text-gray-800 dark:text-blue-500">
                    {job.title}
                  </h3>
                  <p className="text-black-600 text-sm">{job.company}</p>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {job.location}
                  </p>
                </div>
              ))}
        </div>
        {!isMobile && (
          <JobCard
            loading={loading}
            selectedJob={selectedJob}
            customComponents={customComponents}
            jobDetailsRef={jobDetailsRef}
          />
        )}
      </div>
      {isMobile && isJobCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800">
            <button
              onClick={closeJobCard}
              className="absolute right-4 top-4 text-2xl text-gray-500"
            >
              &times;
            </button>
            <JobCard
              loading={loading}
              selectedJob={selectedJob}
              customComponents={customComponents}
              jobDetailsRef={jobDetailsRef}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchCard;