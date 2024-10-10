"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface TrackerContextType {
  viewedJobs: Set<number>;
  setViewedJobs: Dispatch<SetStateAction<Set<number>>>;
  appliedJobs: Set<number>;
  setAppliedJobs: Dispatch<SetStateAction<Set<number>>>;
  originalViewedJobs: Set<number>;
  setOriginalViewedJobs: Dispatch<SetStateAction<Set<number>>>;
  originalAppliedJobs: Set<number>;
  setOriginalAppliedJobs: Dispatch<SetStateAction<Set<number>>>;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
};

interface TrackerProviderProps {
  children: ReactNode;
}

export const TrackerProvider: React.FC<TrackerProviderProps> = ({
  children,
}) => {
  const [viewedJobs, setViewedJobs] = useState<Set<number>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [originalViewedJobs, setOriginalViewedJobs] = useState<Set<number>>(
    new Set()
  );
  const [originalAppliedJobs, setOriginalAppliedJobs] = useState<Set<number>>(
    new Set()
  );
  return (
    <TrackerContext.Provider
      value={{
        viewedJobs,
        setViewedJobs,
        appliedJobs,
        setAppliedJobs,
        originalViewedJobs,
        setOriginalViewedJobs,
        originalAppliedJobs,
        setOriginalAppliedJobs,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
