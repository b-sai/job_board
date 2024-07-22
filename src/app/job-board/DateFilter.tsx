import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DateSelectorDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Date Posted");
  const dropdownRef = useRef(null);

  const options = [
    { label: "1 Day ago", value: "1" },
    { label: "3 Days ago", value: "3" },
    { label: "7 Days ago", value: "7" },
  ];

  const handleSelect = (option: any) => {
    setSelected(option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as Node).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full transform justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <ChevronDown
            className={`duration-50 -mr-1 ml-2 h-5 w-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <a
                key={option.value}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(option);
                }}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelectorDropdown;
