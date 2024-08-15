"use client";
import { useEffect, useState } from "react";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useResume } from "ResumeContext";
import { PositionSelector } from "resume-parser/PositionSelector";
import { useMediaQuery } from "react-responsive";
import Switch from "job-board/Switch";
import { useFilter } from "FilterDataProvider";

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
  } = useResume();
  const { needVisaSponsorship, setNeedVisaSponsorship } = useFilter();
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
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-shrink-0 p-1">
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
      {!isMobile && positions.length > 0 && (
        <PositionSelector
          positions={positions}
          selectedPositions={selectedPositions}
          onPositionToggle={handlePositionToggle}
        />
      )}
      <div>
        <Switch
          label="Need Visa Sponsorship"
          isChecked={needVisaSponsorship}
          setIsChecked={setNeedVisaSponsorship}
        />
      </div>
    </div>
  );
}