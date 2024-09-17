import React from "react";
import ReactMarkdown from "react-markdown";
import DetailedLoadingCard from "./loading";
import Image from "next/image";
import { DateChip, LocationChip, SalaryChip } from "./Chips";
import { ShareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast"; // Make sure to install and import react-hot-toast

interface JobDetailsProps {
  loading: boolean;
  selectedJob: any | null;
  customComponents: Record<string, React.FC<any>>;
  jobDetailsRef: React.RefObject<HTMLDivElement> | null;
  setAppliedJobs: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  loading,
  selectedJob,
  customComponents,
  jobDetailsRef,
  setAppliedJobs,
}) => {
  const handleShare = () => {
    if (selectedJob) {
      const shareUrl = `${window.location.origin}/job/${selectedJob.id}`;
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
          toast.error("Failed to copy link");
        });
    }
  };

  return (
    <div ref={jobDetailsRef} className="w-full overflow-y-auto py-4 pl-0 pr-4 ">
      {loading ? (
        <DetailedLoadingCard />
      ) : selectedJob ? (
        <div>
          <div className="mb-4 flex items-start justify-between">
            <Image
              src={selectedJob.image_url || "/company_na.png"}
              alt={`${selectedJob.company} logo`}
              width={50}
              height={50}
              className="h-16 w-16"
            />
            <button
              onClick={handleShare}
              className="rounded bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
              title="Copy share link"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
            {selectedJob.title}
          </h2>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            {selectedJob.company}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            <SalaryChip
              minSalary={selectedJob.min_amount}
              maxSalary={selectedJob.max_amount}
            />
            <DateChip date={selectedJob.date_posted} />
            <LocationChip location={selectedJob.location} />
          </div>
          <button
            onClick={() => {
              window.open(selectedJob.job_url_final, "_blank");
              setAppliedJobs((prevSet) => new Set(prevSet).add(selectedJob.id));
            }}
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
      ) : null}
    </div>
  );
};

export default JobDetails;
