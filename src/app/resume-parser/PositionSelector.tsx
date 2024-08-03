import React from "react";

interface PositionSelectorProps {
  positions: string[];
  selectedPositions: number[];
  onPositionToggle: (index: number) => void;
}

export function PositionSelector({
  positions,
  selectedPositions,
  onPositionToggle,
}: PositionSelectorProps) {
  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Roles Tailored to Selected Experiences
      </h1>
      <div className="grid gap-2">
        {positions.map((option, index) => (
          <label
            key={index}
            className="grid grid-cols-[auto,1fr] items-start gap-3"
          >
            <input
              type="checkbox"
              className="form-checkbox mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white"
              checked={selectedPositions.includes(index)}
              onChange={() => onPositionToggle(index)}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
