import React from "react";
import ReactMarkdown from "react-markdown";
import DetailedLoadingCard from "./loading";

interface JobDetailsProps {
  loading: boolean;
  selectedJob: any | null;
  customComponents: Record<string, React.FC<any>>;
  jobDetailsRef: React.RefObject<HTMLDivElement>;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  loading,
  selectedJob,
  customComponents,
  jobDetailsRef,
}) => {
  return (
    <div
      ref={jobDetailsRef}
      className="w-full overflow-y-auto py-4 pl-0 pr-4 lg:w-2/3"
    >
      {loading ? (
        <DetailedLoadingCard />
      ) : selectedJob ? (
        <div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
            {selectedJob.title}
          </h2>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            {selectedJob.company}
          </p>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {selectedJob.date_posted} • {selectedJob.location}
          </p>
          <button
            onClick={() => window.open(selectedJob.job_url_direct, "_blank")}
            className="mb-4 rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-600"
          >
            Apply Now
          </button>
          <div className="text-12 -50 rounded-lg p-4">
            <ReactMarkdown components={customComponents}>
              {selectedJob.description || "No description available"}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-gray-500">
            Could not find relevant roles for your resume. Try increasing the
            number of days.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
