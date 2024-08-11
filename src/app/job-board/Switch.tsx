import React, { useState } from "react";

interface SwitchProps {
  label?: string;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ label, isChecked, setIsChecked }) => {
  return (
    <div className="p-4">
      {" "}
      <label className="inline-flex cursor-pointer items-center">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div
            className={`block h-6 w-12 rounded-full transition-colors duration-300 ease-in-out ${
              isChecked ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
              isChecked ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-700">
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default Switch;
