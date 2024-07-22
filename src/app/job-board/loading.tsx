import React from "react";
export const LoadingCard = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      <div className="space-y-2">
        <div className="h-4 rounded bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};
export const DetailedLoadingCard = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      {/* Job Title */}
      <div className="h-8 w-3/4 rounded bg-gray-200"></div>

      {/* Company Name */}
      <div className="h-6 w-1/2 rounded bg-gray-200"></div>

      {/* Apply Now Button */}
      <div className="h-10 w-32 rounded bg-blue-200"></div>

      {/* Job Requirements */}
      <div className="mt-6 space-y-3">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-2 mt-1 h-3 w-3 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              {index % 2 === 0 && (
                <div className="mt-1 h-4 w-4/5 rounded bg-gray-200"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Job Type */}
      <div className="mt-4 h-4 w-1/4 rounded bg-gray-200"></div>

      {/* Pay Range */}
      <div className="h-4 w-2/5 rounded bg-gray-200"></div>
    </div>
  );
};
