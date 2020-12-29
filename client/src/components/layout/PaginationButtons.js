import React from "react";

const PaginationButton = ({
  jobsPerPage,
  totalJobs,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  return (
    <>
      {totalJobs > jobsPerPage && (
        <div className="mb-5">
          <button
            className="btn btn-primary"
            id="add-cart"
            onClick={() => prevPage()}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>

          <button
            className="btn btn-primary"
            id="add-cart"
            onClick={() => nextPage(currentPage)}
            style={{ float: "right" }}
            disabled={currentPage === Math.ceil(totalJobs / jobsPerPage)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </>
  );
};

export default PaginationButton;
