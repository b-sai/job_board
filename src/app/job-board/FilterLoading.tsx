import React from "react";

const PulsingLoadingComponent = () => {
  return (
    <div className="flex flex-wrap gap-2 py-[0.62rem]">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-8 w-20 animate-pulse rounded-full bg-gray-200"
        />
      ))}
      <div className="flex space-x-2">
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default PulsingLoadingComponent;
