"use client";
import React from "react";
import JobLevelFilter from "./Filters";
import StateFilter from "./StateFilter";
import DateFilter from "./DateFilter";
import { Dispatch, SetStateAction } from "react";
import { useFilter } from "FilterDataProvider";
import { PositionSelector } from "../resume-parser/PositionSelector";
import { useResume } from "ResumeContext";
import { useMediaQuery } from "react-responsive"; // Add this import
import Switch from "./Switch";

const FilterGroup: React.FC = () => {
  const {
    selectedLevels,
    setSelectedLevels,
    datePosted,
    setDatePosted,
    selectedLocations,
    setSelectedLocations,
    showTopCompanies,
    setShowTopCompanies,
    needVisaSponsorship,
    setNeedVisaSponsorship,
  } = useFilter();

  const { positions, selectedPositions, setSelectedPositions } = useResume();

  const handlePositionToggle = (index: number) => {
    setSelectedPositions((prev) => {
      const newSelectedPositions = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
      return newSelectedPositions;
    });
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="space-y-4 p-4">
      <div className="w-full">
        <JobLevelFilter
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
        />
      </div>
      <div className="w-full">
        <DateFilter datePosted={datePosted} setDatePosted={setDatePosted} />
      </div>
      <div className="w-full">
        <StateFilter
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </div>
      {positions.length > 0 && (
        <PositionSelector
          positions={positions}
          selectedPositions={selectedPositions}
          onPositionToggle={handlePositionToggle}
        />
      )}
      <div>
        <Switch
          label="Require Visa Sponsorship"
          isChecked={needVisaSponsorship}
          setIsChecked={setNeedVisaSponsorship}
        />
      </div>
      <div>
        <Switch
          label="Show Top Companies"
          isChecked={showTopCompanies}
          setIsChecked={setShowTopCompanies}
        />
      </div>
    </div>
  );
};

export default FilterGroup;