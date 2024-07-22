"use client";
import { useState } from "react";
import { ResumeDropzone } from "components/ResumeDropzone";
import { Heading } from "components/documentation";
import { useResume } from "ResumeContext";

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { setResume } = useResume();

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
      </div>
    </main>
  );
}
