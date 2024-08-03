"use client";
import { useState } from "react";
import { ResumeDropzone } from "components/ResumeDropzone";
import { Heading } from "components/documentation";
import { useResume } from "ResumeContext";

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const {
    setResume,
    positions,
    setPositions,
    selectedPositions,
    setSelectedPositions,
  } = useResume();

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
      <div className="flex-shrink-0 p-4">
        <h1 className="mb-4 text-center text-xl font-bold">
          Drop Your Resume to get{" "}
          <span className="text-blue-500 dark:text-blue-300">
            personalized recommendations
          </span>
        </h1>
        <ResumeDropzone
          onFileUrlChange={handleFileUrlChange}
          onFileChange={handleFileChange}
          playgroundView={true}
        />
      </div>
      {positions.length > 0 && (
        <div className="flex-grow overflow-y-auto p-4">
          <Heading
            level={2}
            className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Roles Tailored to Selected Experiences
          </Heading>
          <div className="grid gap-2">
            {positions.map((option, index) => (
              <label
                key={index}
                className="grid grid-cols-[auto,1fr] items-start gap-3"
              >
                <input
                  type="checkbox"
                  className="form-checkbox mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white"
                  checked={selectedPositions.includes(index)}
                  onChange={() => handlePositionToggle(index)}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}