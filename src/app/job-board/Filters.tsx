"use client";
import React, { useState, useEffect } from "react";
import { cx } from "lib/cx";
import { Heading } from "components/documentation";
import { Button } from "components/Button";

const jobLevels = [
  { display: "Intern", value: "Intern" },
  { display: "Junior/New Grad", value: "Junior" },
  { display: "Mid Level", value: "Mid Level" },
  { display: "Senior", value: "Senior" },
  { display: "Lead", value: "Lead" },
];

const JobLevelFilter: React.FC<{
  selectedLevels: string[];
  setSelectedLevels: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedLevels, setSelectedLevels }) => {
  const toggleLevel = (value: string) => {
    setSelectedLevels((prev) =>
      prev.includes(value) ? prev.filter((l) => l !== value) : [...prev, value]
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1">
        {jobLevels.map((level) => (
          <Button
            key={level.value}
            onClick={() => toggleLevel(level.value)}
            className={cx(
              "rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
              selectedLevels.includes(level.value)
                ? "scale-105 transform bg-blue-500 text-white shadow-md dark:bg-blue-500 dark:text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-500 dark:text-white dark:hover:bg-slate-400 dark:hover:text-white",
              "dark:focus:bg-blue-500 dark:focus:text-white dark:active:bg-blue-500 dark:active:text-white"
            )}
          >
            {level.display}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobLevelFilter;
