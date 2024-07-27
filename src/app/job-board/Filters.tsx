"use client";
import React, { useState, useEffect } from "react";
import { cx } from "lib/cx";
import { Heading } from "components/documentation";
import { Button } from "components/Button";

const jobLevels = [
  "Intern",
  "New Grad",
  "Junior",
  "Mid Level",
  "Senior",
  "Lead",
];

const JobLevelFilter: React.FC<{
  selectedLevels: string[];
  setSelectedLevels: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedLevels, setSelectedLevels }) => {
  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1">
        {jobLevels.map((level) => (
          <Button
            key={level}
            onClick={() => toggleLevel(level)}
            className={cx(
              "rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 dark:bg-gray-500 dark:text-white",
              selectedLevels.includes(level)
                ? "scale-105 transform bg-blue-500 text-white shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:bg-gray-700"
            )}
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobLevelFilter;
