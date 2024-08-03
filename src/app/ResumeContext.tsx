"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ResumeContextType {
  resume: any;
  setResume: (resume: any) => void;
  positions: Array<string>;
  setPositions: (positions: Array<string>) => void;
  selectedPositions: Array<number>;
  setSelectedPositions: React.Dispatch<React.SetStateAction<Array<number>>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        positions,
        setPositions,
        selectedPositions,
        setSelectedPositions,
        sidebarOpen,
        setSidebarOpen,
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
