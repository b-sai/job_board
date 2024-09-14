"use client";
import dynamic from "next/dynamic";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { X } from "lucide-react";
import { useFilter } from "FilterDataProvider";

interface StateFilterProps {
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

const StateFilter: React.FC<StateFilterProps> = ({
  selectedLocations,
  setSelectedLocations,
}: StateFilterProps) => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { locationData } = useFilter();

  useEffect(() => {
    if (input.length > 0) {
      const filtered = locationData.filter((location) =>
        location.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    }
  }, [input]);
  useEffect(() => {
    if (isOpen) {
      setSuggestions(locationData);
      setIsOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSelectLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
    // setInput("");
    // Keep the suggestions list open
    setIsOpen(true);
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
  };
  return (
    <div className="flex w-full flex-col">
      <div className="relative w-full" ref={wrapperRef}>
        <div className="mt-2 w-full">
          <div className="flex flex-wrap">
            {selectedLocations.map((location) => (
              <span
                key={location}
                className="m-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800"
              >
                {location}
                <button
                  onClick={() => handleRemoveLocation(location)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          type="text"
          className="w-full rounded-md border px-4 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="Location"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && (
          <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg dark:bg-gray-800">
            {suggestions.map((suggestion: string) => (
              <li
                key={suggestion}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSelectLocation(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StateFilter;