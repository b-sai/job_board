const LoadingCard = () => {
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

export default LoadingCard;
