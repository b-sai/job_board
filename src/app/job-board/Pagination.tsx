const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`w-24 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 ${
          currentPage === 1 ? "invisible" : ""
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`w-24 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 ${
          currentPage === totalPages ? "invisible" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
