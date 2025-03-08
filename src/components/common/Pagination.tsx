"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): number[] => {
    const pageGroup = Math.ceil(currentPage / 5);
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(pageGroup * 5, totalPages);

    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center gap-1 mt-16 mb-56 sm:mt-16 sm:mb-[13.5rem] md:mt-16 md:mb-[16.5rem]">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-16 h-16 rounded-full border border-gray-300 bg-white text-gray-600 text-lg cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"<"}
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={
            currentPage === pageNum
              ? "w-16 h-16 rounded-full bg-blue-500 text-white text-lg cursor-pointer"
              : "w-16 h-16 rounded-full border border-gray-300 bg-white text-gray-600 text-lg cursor-pointer hover:bg-gray-100"
          }
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-16 h-16 rounded-full border border-gray-300 bg-white text-gray-600 text-lg cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
