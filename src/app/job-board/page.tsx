"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
interface Job {
  id: number;
  title: string;
  company?: string;
  description?: string;
}
const JobSearchCard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const jobs: Job[] = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      description: `
# About the job

**Hi, We're Centerfield**.

Supercharged customer acquisition. Centerfield delivers outcome-based digital marketing solutions and personalized omnichannel experiences for the world's leading brands. Powered by our proprietary Dugout platform, Centerfield acquires customers at scale for leading residential service, insurance, e-commerce, and B2B brands. Centerfield's digital experiences and digital brands, such as Business.com and BroadbandNow.com, reach more than 150 million in-market shoppers annually. Centerfield is headquartered in Silicon Beach and is proud to be recognized by Built in LA as a Best Place to Work in Los Angeles.

## The Opportunity...

Centerfield Media, a leading Los Angeles-based online advertising agency, is looking for a talented Machine Learning Engineer to join us in building innovative advertising technology. We are looking for a highly motivated, web-focused, engineer experienced with the full data life cycle. You will help design the data science programs, machine learning models, and architecture to support Generative AI. You must have practical experience working with large data sets preferably in website lead generation & search engine marketing, SaaS, or cloud computing domains.

## How You'll Contribute...

- Ability to lead projects individually and deliver them on time.
- Experience with Realtime streaming implementation and architecture is a bonus.
- Support data-informed decision-making, throughout the Product Org and broader company.
- Be a thought leader and evangelist to drive adoption and knowledge at all levels of the organization.
- Constantly look for strategic ways to expand the charter of the Data Science team beyond causal inference, starting with Ranking Data Science, and Market-Place Dynamics.
      `,
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      description: "Join our team to create stunning user experiences...",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudSys",
      description: "Help us build and maintain robust infrastructure...",
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataTech",
      description: "Apply your analytical skills to solve complex problems...",
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "TechCorp",
      description: "Exciting opportunity for a skilled frontend developer...",
    },
    {
      id: 6,
      title: "UX Designer",
      company: "DesignHub",
      description: "Join our team to create stunning user experiences...",
    },
    {
      id: 7,
      title: "DevOps Engineer",
      company: "CloudSys",
      description: "Help us build and maintain robust infrastructure...",
    },
    {
      id: 8,
      title: "Data Scientist",
      company: "DataTech",
      description: "Apply your analytical skills to solve complex problems...",
    },
    {
      id: 9,
      title: "Frontend Developer",
      company: "TechCorp",
      description: "Exciting opportunity for a skilled frontend developer...",
    },
    {
      id: 11,
      title: "UX Designer",
      company: "DesignHub",
      description: "Join our team to create stunning user experiences...",
    },
    {
      id: 12,
      title: "DevOps Engineer",
      company: "CloudSys",
      description: "Help us build and maintain robust infrastructure...",
    },
    {
      id: 13,
      title: "Data Scientist",
      company: "DataTech",
      description: "Apply your analytical skills to solve complex problems...",
    },
    {
      id: 14,
      title: "Frontend Developer",
      company: "TechCorp",
      description: "Exciting opportunity for a skilled frontend developer...",
    },
    {
      id: 15,
      title: "UX Designer",
      company: "DesignHub",
      description: "Join our team to create stunning user experiences...",
    },
  ];

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
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

  return (
    <div className="mt-6 flex min-h-screen flex-col gap-6 bg-gray-50 p-6 md:mx-20 md:flex-row md:justify-center">
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
      </div>
      <div className="h-[calc(100vh-3rem)] w-full overflow-y-auto md:w-2/3">
        {selectedJob ? (
          <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              {selectedJob.title}
            </h2>
            <p className="mb-4 text-xl text-gray-600">{selectedJob.company}</p>
            <button className="mb-4 rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
  );
};

export default JobSearchCard;
