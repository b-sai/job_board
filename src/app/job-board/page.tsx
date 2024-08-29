"use client";

import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
} from "react";
import { useResume } from "ResumeContext";
import LoadingCard from "./loadingcard";
import "./customScrollBar.css"; // Add this import
import JobCard from "./JobCard";
import { useMediaQuery } from "react-responsive"; // Add this import
import PulsingLoadingComponent from "./FilterLoading";
import FilterGroup from "./FilterMain";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";
interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url_final?: string;
  date_posted?: string;
  location?: string;
  score?: number;
  logo_photo_url?: string;
  min_amount?: number;
  max_amount?: number;
}
import { useFilter } from "FilterDataProvider";
import {
  AppliedChip,
  CompleteMatchChip,
  PartialMatchChip,
  StrongFitChip,
  ViewedChip,
  WeakMatchChip,
} from "./Chips";
import { upsertJobs } from "./FetchData";
import useTrackExit from "hooks/unload";
import { useSession } from "next-auth/react";
import ResumeParser from "resume-parser/page";
import toggleLevel from "./Filters";
const JobSearchCard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isResumeUpload, setIsResumeUpload] = useState(false);

  const posthog = usePostHog();
  const [originalViewedJobs, setOriginalViewedJobs] = useState<Set<number>>(
    new Set()
  );
  const [originalAppliedJobs, setOriginalAppliedJobs] = useState<Set<number>>(
    new Set()
  );
  const [viewedJobs, setViewedJobs] = useState<Set<number>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const userId: string | undefined =
    posthog.get_distinct_id() || process.env.NEXT_PUBLIC_USER_ID;
  const session = useSession();
  const {
    selectedLevels,
    selectedLocations,
    datePosted,
    needVisaSponsorship,
    showTopCompanies,
    setSelectedLevels,
    setShowTopCompanies,
  } = useFilter();
  const {
    resume,
    setPositions,
    selectedPositions,
    setSelectedPositions,
    useUserId,
    setUseUserId,
    setIsParsing,
    fileUrl,
    setDummyResumeName,
    isLoading,
    setIsLoading,
    resumeUploadCount,
    setResumeUploadCount,
  } = useResume();
  const jobListRef = useRef<HTMLDivElement>(null);
  const [isJobCardOpen, setIsJobCardOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { filterIsEnabled, setFilterIsEnabled, locationData, setLocationData } =
    useFilter();
  useEffect(() => {
    if (resume !== null) {
      if (selectedPositions.length > 0) {
        setFilterIsEnabled(false);
      } else {
        setFilterIsEnabled(true);
      }
    } else {
      setFilterIsEnabled(false);
    }
  }, [
    selectedLocations,
    currentPage,
    datePosted,
    needVisaSponsorship,
    showTopCompanies,
    selectedLevels,
    selectedPositions,
  ]);

  useEffect(() => {
    const handleResumeUpload = async () => {
      if (resume && resume !== "null" && resume !== null && fileUrl !== "") {
        setIsResumeUpload(true);
        setIsParsing(true);
        setIsLoading(true);
        setDummyResumeName(resume.name);
        try {
          const data = await upsertJobs({
            resume,
            userId,
            fileName: resume.name,
          });
          setUseUserId(true);
          if (data.filters && data.filters.level) {
            setSelectedLevels(data.filters.level);
          }

          setResumeUploadCount(resumeUploadCount + 1);
        } catch (error) {
          console.error("Error upserting jobs:", error);
        } finally {
          setIsParsing(false);
        }
      }
    };

    handleResumeUpload();
  }, [resume]);

  const fetchLocationData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error(
          "API URL is not defined. Please check your environment variables."
        );
      }

      const response = await fetch(`${baseUrl}locations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Add any required body parameters here
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const locationList = data.map(
        (item: { location: string }) => item.location
      );
      setLocationData(locationList);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchJobs = async () => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      setIsLoading(true);
      // Create FormData object for both query parameters and file
      const formData = new FormData();

      // Add query parameters to FormData
      formData.append("skip", skip.toString());
      formData.append("limit", itemsPerPage.toString());
      formData.append("dateset", datePosted.toString());
      if (userId && useUserId) {
        formData.append("user_id", userId);
      }

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
      if (needVisaSponsorship) {
        formData.append("needs_visa_sponsorship", "true");
      }
      if (showTopCompanies) {
        formData.append("show_top_companies", "true");
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
      setIsLoading(false);
      setPositions(data.positions);
      setFilterIsEnabled(false);
      if (data.jobs.length > 0) {
        setSelectedJob(data.jobs[0]);
        setViewedJobs((prevSet) => new Set(prevSet).add(data.jobs[0].id));
      } else {
        setSelectedJob(null);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Error fetching jobs. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (session.status === "loading") {
        setIsLoading(true);
        return;
      }
      if (userId && session.status === "authenticated") {
        try {
          const response = await fetch(
            `${baseUrl}user_exists/${session.data.user?.email}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.file_name) {
            setDummyResumeName(data.file_name);
            setUseUserId(true);
            setSelectedPositions([0]);
            if (data.filters && data.filters.level.length > 0) {
              setSelectedLevels(data.filters.level);
            }
          } else {
            setUseUserId(false);
          }
        } catch (error) {
          console.error("Error checking user existence:", error);
          setUseUserId(false);
        }
      } else {
        setUseUserId(false);
      }

      if (session.status === "authenticated") {
        try {
          const response = await fetch(
            `${baseUrl}interactions/?user_id=${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            for (const job of data) {
              if (job.interaction_type === "viewed") {
                setOriginalViewedJobs((prevSet) =>
                  new Set(prevSet).add(job.application_id)
                );
              } else if (job.interaction_type === "applied") {
                setOriginalAppliedJobs((prevSet) =>
                  new Set(prevSet).add(job.application_id)
                );
              }
            }
          }
        } catch (error) {
          console.error("Error fetching trackings:", error);
        }
      }
      setResumeUploadCount(resumeUploadCount + 1);
    };

    initializeData();
  }, [session.status]);

  useEffect(() => {
    if (useUserId !== null) {
      fetchJobs();
    }
  }, [resumeUploadCount]);

  useEffect(() => {
    fetchLocationData();
  }, []);
  const jobDetailsRef = useRef<HTMLDivElement>(null);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) {
      setIsJobCardOpen(true);
    }
    if (jobDetailsRef.current) {
      jobDetailsRef.current.scrollTo(0, 0);
    }
    setViewedJobs((prevSet) => new Set(prevSet).add(job.id));
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
  useTrackExit(userId, viewedJobs, appliedJobs);

  const handleExpandSearch = () => {
    setShowTopCompanies(false);
    setResumeUploadCount(resumeUploadCount + 1);
  };

  return (
    <div
      className={`container mx-auto flex h-[calc(100vh-80px)] flex-col ${
        !isMobile ? "p-4" : ""
      }`}
    >
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:flex-row lg:gap-6">
        <div
          ref={jobListRef}
          className="custom-scrollbar w-full overflow-y-auto  lg:w-1/3 "
        >
          {isMobile && (
            <div className="p-2">
              <ResumeParser />
            </div>
          )}
          {isLoading ? (
            Array(10)
              .fill(null)
              .map((_, index) => <LoadingCard key={index} />)
          ) : jobs.length === 0 ? (
            <div className="p-4 text-center text-gray-600 dark:text-gray-400">
              Could not find relevant roles for applied filters. Try increasing
              the number of days.
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className={`cursor-pointer border-l-4 p-4 transition-all duration-300 ${
                  selectedJob?.id === job.id
                    ? "border-blue-500 bg-blue-50 dark:bg-slate-700"
                    : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleJobSelect(job)}
              >
                <div className="flex items-start">
                  <Image
                    src={job.logo_photo_url || "/company_na.png"}
                    alt={"Company Logo"}
                    width={30}
                    height={30}
                    className="mr-3 rounded-full"
                  />
                  <div className="flex-grow">
                    <h3 className="pb-1 font-semibold text-gray-800 dark:text-blue-500">
                      {job.title}
                    </h3>
                    <p className="text-black-600 text-sm">{job.company}</p>
                    <p className="text-sm text-gray-600 dark:text-white">
                      {job.location}
                      {job.min_amount !== null && job.max_amount !== null && (
                        <>
                          {" • $"}
                          {job.min_amount?.toLocaleString()} -{" "}
                          {job.max_amount?.toLocaleString()}
                        </>
                      )}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {job.score && job.score > 0.3 ? (
                        <CompleteMatchChip />
                      ) : job.score && job.score > 0.21 ? (
                        <StrongFitChip />
                      ) : job.score && job.score > 0.12 ? (
                        <PartialMatchChip />
                      ) : job.score && job.score >= -1 ? (
                        <WeakMatchChip />
                      ) : null}

                      {appliedJobs.has(job.id) ||
                      originalAppliedJobs.has(job.id) ? (
                        <div className="flex items-center gap-2">
                          {job.score && (
                            <p className="text-sm text-black dark:text-white">
                              •
                            </p>
                          )}
                          <AppliedChip />
                        </div>
                      ) : viewedJobs.has(job.id) ||
                        originalViewedJobs.has(job.id) ? (
                        <div className="flex items-center gap-2">
                          {job.score && (
                            <p className="text-sm text-black dark:text-white">
                              •
                            </p>
                          )}
                          <ViewedChip />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {showTopCompanies && jobs.length > 0 && !isLoading && (
            <div className="p-4 text-center">
              <button
                onClick={handleExpandSearch}
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Expand your search: Turn off "show top companies" to view more
                jobs
              </button>
            </div>
          )}
        </div>
        {!isMobile && (
          <JobCard
            loading={isLoading}
            selectedJob={selectedJob}
            customComponents={customComponents}
            jobDetailsRef={jobDetailsRef}
            setAppliedJobs={setAppliedJobs}
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
              loading={isLoading}
              selectedJob={selectedJob}
              customComponents={customComponents}
              jobDetailsRef={jobDetailsRef}
              setAppliedJobs={setAppliedJobs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchCard;

