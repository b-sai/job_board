"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}

const CollapsibleSidebarLayout: React.FC<LayoutProps> = ({ sidebar, main }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-[calc(100vh-var(--top-nav-bar-height))] flex-col overflow-hidden">
      {/* Top bar with hamburger menu for mobile */}
      <div className="flex items-center p-4 md:hidden">
        <button
          className="z-30 mr-4"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-[var(--top-nav-bar-height)] left-0 z-30 w-[85%] max-w-sm transform overflow-y-auto bg-white transition duration-300 ease-in-out dark:bg-gray-900 md:relative md:inset-y-0 md:w-1/4 md:max-w-none md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex justify-start p-4 md:hidden">
            <button
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          {sidebar}
        </div>
        {/* Main content */}
        <div className="w-full flex-grow overflow-y-auto md:w-3/4">{main}</div>
      </div>
    </div>
  );
};

export default CollapsibleSidebarLayout;
