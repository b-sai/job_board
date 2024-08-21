"use client";
import { useEffect, useState } from "react";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useResume } from "ResumeContext";
import { PositionSelector } from "resume-parser/PositionSelector";
import { useMediaQuery } from "react-responsive";
import Switch from "job-board/Switch";
import { useFilter } from "FilterDataProvider";
import FilterMain from "job-board/FilterMain";

export default function ResumeParser() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const {
    resume,
    setResume,
    positions,
    setPositions,
    selectedPositions,
    setSelectedPositions,
    isLoading,
  } = useResume();
  const {
    needVisaSponsorship,
    setNeedVisaSponsorship,
    showTopCompanies,
    setShowTopCompanies,
  } = useFilter();

  const handleFileUrlChange = (fileUrl: string | null) => {
    setFileUrl(fileUrl);
  };
  const handleFileChange = (file: File | null) => {
    setResume(file);
  };
  const handlePositionToggle = (index: number) => {
    setSelectedPositions((prev) => {
      const newSelectedPositions = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
      return newSelectedPositions;
    });
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="mb-4 text-center text-xl font-bold">
          Find Jobs Personalized to Your Resume
          <span className="text-blue-500 dark:text-blue-300"></span>
        </h1>
        <ResumeDropzone
          onFileUrlChange={handleFileUrlChange}
          onFileChange={handleFileChange}
          playgroundView={true}
        />
      </div>
      <div>
        {!isMobile && (
          <div>
            <FilterMain />
          </div>
        )}
      </div>
    </div>
  );
}
