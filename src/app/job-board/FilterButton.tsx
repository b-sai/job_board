import React, { useState, useEffect, useRef } from "react";
import { Filter, X } from "lucide-react";
import { createPortal } from "react-dom";

const Overlay = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (overlay) {
      const rect = (overlay as HTMLElement).getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--overlay-top",
        `${rect.top}px`
      );
      document.documentElement.style.setProperty(
        "--overlay-left",
        `${rect.left}px`
      );
      document.documentElement.style.setProperty(
        "--overlay-width",
        `${rect.width}px`
      );
      document.documentElement.style.setProperty(
        "--overlay-height",
        `${rect.height}px`
      );
    }
  }, []);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
};

const FilterButtonWithModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Filter className="mr-2 h-4 w-4" />
        <span className="text-sm font-medium">Filter</span>
      </button>

      {isOpen && (
        <Overlay onClose={toggleModal}>
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={toggleModal}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default FilterButtonWithModal;
