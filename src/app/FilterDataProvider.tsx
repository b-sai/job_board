"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FilterContextType {
  selectedLevels: string[];
  setSelectedLevels: Dispatch<SetStateAction<string[]>>;
  datePosted: number;
  setDatePosted: Dispatch<SetStateAction<number>>;
  selectedLocations: string[];
  setSelectedLocations: Dispatch<SetStateAction<string[]>>;
  filterIsEnabled: boolean;
  setFilterIsEnabled: Dispatch<SetStateAction<boolean>>;
  locationData: string[];
  setLocationData: Dispatch<SetStateAction<string[]>>;
  needVisaSponsorship: boolean;
  setNeedVisaSponsorship: Dispatch<SetStateAction<boolean>>;
  showTopCompanies: boolean;
  setShowTopCompanies: Dispatch<SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [datePosted, setDatePosted] = useState(3);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filterIsEnabled, setFilterIsEnabled] = useState(false);
  const [locationData, setLocationData] = useState<string[]>([]);
  const [needVisaSponsorship, setNeedVisaSponsorship] = useState(false);
  const [showTopCompanies, setShowTopCompanies] = useState(true);
  return (
    <FilterContext.Provider
      value={{
        selectedLevels,
        setSelectedLevels,
        datePosted,
        setDatePosted,
        selectedLocations,
        setSelectedLocations,
        filterIsEnabled,
        setFilterIsEnabled,
        locationData,
        setLocationData,
        needVisaSponsorship,
        setNeedVisaSponsorship,
        showTopCompanies,
        setShowTopCompanies,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
