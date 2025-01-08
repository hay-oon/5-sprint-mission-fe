import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [1, 2, 3, 4, 5]; // 지정된 배열말고 좀 더 동적인 방식으로 구현할 수 있도록 해야함

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-button"
      >
        {"<"}
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`page-button ${currentPage === pageNum ? "active" : ""}`}
          disabled={pageNum > totalPages}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-button"
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
