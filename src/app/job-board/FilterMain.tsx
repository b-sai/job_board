import React from "react";
import JobLevelFilter from "./Filters";
import StateFilter from "./StateFilter";
import DateFilter from "./DateFilter";
import { Dispatch, SetStateAction } from "react";
import { useFilter } from "FilterDataProvider";

const FilterGroup: React.FC = () => {
  const {
    selectedLevels,
    setSelectedLevels,
    datePosted,
    setDatePosted,
    selectedLocations,
    setSelectedLocations,
  } = useFilter();

  return (
    <>
      <div className="sm:mr-auto sm:w-1/4">
        <JobLevelFilter
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
        />
      </div>
      <div className="sm:mr-auto">
        <DateFilter datePosted={datePosted} setDatePosted={setDatePosted} />
      </div>
      <div className="w-full sm:mr-auto sm:w-3/5">
        <StateFilter
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </div>
    </>
  );
};

export default FilterGroup;
