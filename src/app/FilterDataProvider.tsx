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

  return (
    <FilterContext.Provider
      value={{
        selectedLevels,
        setSelectedLevels,
        datePosted,
        setDatePosted,
        selectedLocations,
        setSelectedLocations,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
