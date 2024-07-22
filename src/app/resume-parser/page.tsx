"use client";
import { useState } from "react";
import { ResumeDropzone } from "components/ResumeDropzone";
import { Heading } from "components/documentation";
import { useResume } from "ResumeContext";

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { setResume, positions } = useResume();

  const handleFileUrlChange = (fileUrl: string | null) => {
    setFileUrl(fileUrl);
  };

  const handleFileChange = (file: File | null) => {
    setResume(file);
  };

  return (
    <main className="flex h-full w-full max-w-full items-start justify-center overflow-hidden overflow-x-hidden">
      <div className="mt-4 text-center">
        <h1 className="!mt-[1.2em] font-bold">
          Drop Your Resume to get{" "}
          <span className="text-blue-900">personalized recommendations</span>
        </h1>
        <div className="mt-1">
          <ResumeDropzone
            onFileUrlChange={handleFileUrlChange}
            onFileChange={handleFileChange}
            playgroundView={true}
          />
        </div>
        <div className="mt-6 space-y-4">
          {positions.length > 0 && (
            <Heading level={2} className="text-lg font-semibold text-gray-800">
              Resume Parsing Options
            </Heading>
          )}
          <div className="ml-1 space-y-2">
            {positions.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded border-gray-300 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="text-sm font-medium text-gray-700">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
