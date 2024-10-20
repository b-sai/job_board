"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ResumeContextType {
  resume: any;
  setResume: (resume: any) => void;
  positions: Array<string>;
  setPositions: (positions: Array<string>) => void;
  selectedPositions: Array<number>;
  setSelectedPositions: React.Dispatch<React.SetStateAction<Array<number>>>;
  useUserId: boolean | null;
  setUseUserId: React.Dispatch<React.SetStateAction<boolean | null>>;
  isParsing: boolean;
  setIsParsing: React.Dispatch<React.SetStateAction<boolean>>;
  fileUrl: string;
  setFileUrl: React.Dispatch<React.SetStateAction<string>>;
  dummyResumeName: string;
  setDummyResumeName: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resumeUploadCount: number;
  setResumeUploadCount: React.Dispatch<React.SetStateAction<number>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [resume, setResume] = useState<any>(null);
  const [positions, setPositions] = useState<Array<string>>([]);
  const [selectedPositions, setSelectedPositions] = useState<Array<number>>([
    0,
  ]);
  const [useUserId, setUseUserId] = useState<boolean | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [dummyResumeName, setDummyResumeName] = useState<string>("");
  const [resumeUploadCount, setResumeUploadCount] = useState(0);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        positions,
        setPositions,
        selectedPositions,
        setSelectedPositions,
        useUserId,
        setUseUserId,
        isParsing,
        setIsParsing,
        fileUrl,
        setFileUrl,
        dummyResumeName,
        setDummyResumeName,
        isLoading,
        setIsLoading,
        resumeUploadCount,
        setResumeUploadCount,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
