"use client";

import React from "react";
import { useMediaQuery } from "react-responsive"; // Add this import
import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";
import { useFilter } from "FilterDataProvider";
import { useResume } from "ResumeContext";

const MainApp = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { filterIsEnabled, setFilterIsEnabled } = useFilter();
  const { resumeUploadCount, setResumeUploadCount, isLoading } = useResume();

  return (
    <>
      {!isMobile && (
        <div className="flex flex-grow overflow-hidden">
          <div className="flex w-1/5 flex-shrink-0 flex-col">
            <div className="flex-grow overflow-y-auto">
              <div className="flex flex-col">
                <div className="p-4">
                  <ResumeParser />
                </div>
              </div>
            </div>
            {!isMobile && (
              <div className="h-1/7 p-4 ">
                <button
                  onClick={() => {
                    setFilterIsEnabled(true);
                    setResumeUploadCount(resumeUploadCount + 1);
                  }}
                  disabled={filterIsEnabled || isLoading}
                  className={`h-full w-full rounded px-4 py-2 font-bold text-white ${
                    filterIsEnabled || isLoading
                      ? "bg-blue-500 opacity-75"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="min-h-full p-0">
              <JobSearchCard />
            </div>
          </div>
        </div>
      )}
      {isMobile && <JobSearchCard />}
    </>
  );
};

export default MainApp;