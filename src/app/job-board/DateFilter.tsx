import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DateSelectorDropdownProps {
  datePosted: number;
  setDatePosted: (value: number) => void;
}

const DateSelectorDropdown: React.FC<DateSelectorDropdownProps> = ({
  datePosted,
  setDatePosted,
}: DateSelectorDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("3 Days ago");
  const dropdownRef = useRef(null);

  const options = [
    { label: "1 Day ago", value: 1 },
    { label: "3 Days ago", value: 3 },
    { label: "7 Days ago", value: 7 },
  ];

  const handleSelect = (option: any) => {
    setSelected(option.label);
    setDatePosted(option.value);
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
          className="inline-flex w-full transform justify-between rounded-md border bg-white px-4 py-[0.62rem] text-sm font-medium text-gray-700  transition-all duration-300 ease-in-out hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
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
        <div className="absolute right-0 z-50 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out dark:bg-gray-800">
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
                className="z-10 block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white dark:text-white dark:hover:bg-slate-300"
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
