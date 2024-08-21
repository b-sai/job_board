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
import { Tooltip } from "components/Tooltip";
const HorizontalLine = () => {
  return (
    <div className="my-4 border-t border-gray-200 dark:border-gray-300"></div>
  );
};
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
        <HorizontalLine />
        <Tooltip text="Filter jobs by experience level">
          <div className="mb-3 flex  space-x-2 font-medium text-gray-700 dark:text-gray-300">
            <BarChart2 className="h-5 w-5" />
            <span>Level</span>
          </div>
        </Tooltip>
        <JobLevelFilter
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
        />
      </div>

      <HorizontalLine />
      <div className="w-full">
        <Tooltip text="Show jobs posted in last 1/3/7 days">
          <div className="mb-3 flex  space-x-2 font-medium text-gray-700 dark:text-gray-300">
            <CalendarIcon className="h-5 w-5" />
            <span>Date Posted</span>
          </div>
        </Tooltip>

        <DateFilter datePosted={datePosted} setDatePosted={setDatePosted} />
      </div>
      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

      <div className="w-full">
        <Tooltip text="Show jobs within location and all remote eligible locations">
          <div className="mb-3 flex  space-x-2 font-medium text-gray-700 dark:text-gray-300">
            <MapPin className="h-5 w-5" />
            <span>Location</span>
          </div>
        </Tooltip>

        <StateFilter
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </div>

      <HorizontalLine />

      <div>
        <Tooltip
          text={`Top Companies: Show only high paying jobs based on levels.fyi data

Visa Sponsorship: Hides jobs that require clearance or doesn't sponsor visas`}
        >
          <div className="mb-3 flex  space-x-2 font-medium text-gray-700 dark:text-gray-300">
            <Ellipsis className="h-5 w-5" />
            <span>More Filters</span>
          </div>
        </Tooltip>
        <Switch
          label="Show Top Companies"
          isChecked={showTopCompanies}
          setIsChecked={setShowTopCompanies}
        />
        <Switch
          label="Require Visa Sponsorship"
          isChecked={needVisaSponsorship}
          setIsChecked={setNeedVisaSponsorship}
        />
      </div>
      {positions.length > 0 && (
        <div className="w-full">
          <HorizontalLine />
          <Tooltip text="AI looks at only selected roles to give you tailored job recommendations">
            <div className="mb-3 flex  space-x-2 font-medium text-gray-700 dark:text-gray-300">
              <div className="h-5 w-5 flex-shrink-0">
                <Sparkles className="dark: h-full w-full" />
              </div>
              <span>Roles Tailored to Selected Positions</span>
            </div>
          </Tooltip>
          <PositionSelector
            positions={positions}
            selectedPositions={selectedPositions}
            onPositionToggle={handlePositionToggle}
          />
          {selectedPositions.length <= 0 && (
            <p className="pt-2 text-sm text-red-500">
              * select atleast 1 position to enable this filter
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterGroup;