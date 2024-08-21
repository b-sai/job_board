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
import {
  BarChart2,
  CalendarIcon,
  ChevronRight,
  Ellipsis,
  MapPin,
  Sparkles,
} from "lucide-react";

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
        <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>
        <div className="mb-3 flex items-center space-x-2 font-medium text-gray-700">
          <BarChart2 className="h-5 w-5" />
          <span>Level</span>
        </div>
        <JobLevelFilter
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
        />
      </div>

      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

      <div className="w-full">
        <div className="mb-3 flex items-center space-x-2 font-medium text-gray-700">
          <CalendarIcon className="h-5 w-5" />
          <span>Date Posted</span>
        </div>

        <DateFilter datePosted={datePosted} setDatePosted={setDatePosted} />
      </div>
      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

      <div className="w-full">
        <div className="mb-3 flex items-center space-x-2 font-medium text-gray-700">
          <MapPin className="h-5 w-5" />
          <span>Location</span>
        </div>

        <StateFilter
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </div>

      <div className="w-full">
        <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>
        <div className="mb-3 flex  space-x-2 font-medium text-gray-700">
          <div className="h-5 w-5 flex-shrink-0">
            <Sparkles className="h-full w-full" />
          </div>
          <span>Roles Tailored to Selected Positions</span>
        </div>

        {positions.length > 0 && (
          <PositionSelector
            positions={positions}
            selectedPositions={selectedPositions}
            onPositionToggle={handlePositionToggle}
          />
        )}
      </div>
      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

      <div>
        <div className="mb-3 flex items-center space-x-2 font-medium text-gray-700">
          <Ellipsis className="h-5 w-5" />
          <span>More Filters</span>
        </div>
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