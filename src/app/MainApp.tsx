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
        className={`
            ${isMobile ? "h-30" : "w-1/5"} 
            flex-shrink-0 overflow-y-auto 
          `}
      >
        <div className="min-h-full p-4">
          <ResumeParser />
        </div>
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
