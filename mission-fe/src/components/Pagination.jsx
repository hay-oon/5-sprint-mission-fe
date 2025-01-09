import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // 현재 페이지가 속한 그룹의 페이지 번호들을 계산
  const getPageNumbers = () => {
    const pageGroup = Math.ceil(currentPage / 5); // 현재 페이지 그룹
    const startPage = (pageGroup - 1) * 5 + 1; // 그룹의 시작 페이지
    const endPage = Math.min(pageGroup * 5, totalPages); // 그룹의 마지막 페이지

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

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
