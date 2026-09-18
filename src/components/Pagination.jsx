import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        ←
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          className={
            page === currentPage
              ? "pagination-active"
              : ""
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        →
      </button>
    </div>
  );
}

export default Pagination;