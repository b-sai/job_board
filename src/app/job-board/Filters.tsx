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
      <h1 className="mb-2 text-2xl font-bold">Job Level</h1>
      <div className="flex flex-wrap gap-2">
        {jobLevels.map((level) => (
          <Button
            key={level}
            onClick={() => toggleLevel(level)}
            className={cx(
              "rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
              selectedLevels.includes(level)
                ? "scale-105 transform bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
