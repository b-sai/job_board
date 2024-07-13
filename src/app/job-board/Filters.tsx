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

const JobLevelFilter: React.FC = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };
  useEffect(() => {
    console.log(selectedLevels);
  }, [selectedLevels]);

  return (
    <div className="mb-6 w-full">
      <Heading className="mb-3">Job Level</Heading>
      <div className="flex flex-wrap gap-3">
        {jobLevels.map((level) => (
          <Button
            key={level}
            onClick={() => toggleLevel(level)}
            className={cx(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
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
