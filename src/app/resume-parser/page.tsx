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
    <main className="h-full w-full overflow-hidden">
      <div className="mt-4 text-center">
        <Heading level={1} className="!mt-[1.2em]">
          Drop Your Resume to get personalized recommendations
        </Heading>
      </div>
      <div className="mt-3">
        <ResumeDropzone
          onFileUrlChange={handleFileUrlChange}
          onFileChange={handleFileChange}
          playgroundView={true}
        />
      </div>
    </main>
  );
}
