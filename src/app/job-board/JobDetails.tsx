import ReactMarkdown from "react-markdown";
interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
  job_url?: string;
}

const JobDetails = ({ selectedJob }: { selectedJob: Job | null }) => {
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
    <div className="h-[calc(100vh-3rem)] w-full overflow-y-auto md:w-2/3">
      {selectedJob ? (
        <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            {selectedJob.title}
          </h2>
          <p className="mb-4 text-xl text-gray-600">{selectedJob.company}</p>
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
          <p className="text-lg text-gray-500">Select a job to view details</p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
