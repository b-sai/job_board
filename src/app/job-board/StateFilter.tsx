import React, { useState, useEffect, ChangeEvent } from "react";
import { X } from "lucide-react";

// Mock data for locations (you would replace this with real data or an API call)
const locations: string[] = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "California",
  "Texas",
  "Florida",
  "New York",
  "Pennsylvania",
];

const StateFilter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = locations.filter((location) =>
        location.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSelectLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
    setInput("");
    setSuggestions([]);
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="mb-2 text-2xl font-bold">Job Level</h1>
      <div className="mb-2">
        {selectedLocations.map((location) => (
          <span
            key={location}
            className="mb-2 mr-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800"
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
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a city or state"
          value={input}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
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
