"use client";

import React from "react";
import { useMediaQuery } from "react-responsive"; // Add this import
import ResumeParser from "resume-parser/page";
import JobSearchCard from "job-board/page";

const MainApp = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={`flex ${isMobile ? "flex-col" : ""} flex-grow overflow-hidden`}
    >
      <div
        className={`${
          isMobile ? "h-full" : "w-1/5"
        } flex flex-shrink-0 flex-col`}
      >
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col">
            <div className="p-4">
              <ResumeParser />
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="h-1/7 p-4 ">
            <button className="h-full w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600">
              Apply Filters
            </button>
          </div>
        )}
      </div>
      <div className={`${isMobile ? "h-4/5" : "flex-grow"} overflow-y-auto`}>
        <div className="min-h-full p-0">
          <JobSearchCard />
        </div>
      </div>
    </div>
  );
};

export default MainApp;