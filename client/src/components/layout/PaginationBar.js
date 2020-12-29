import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({
  jobsPerPage,
  totalJobs,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {totalJobs > jobsPerPage && (
        <Pagination size="md" className="pagination-container">
          <Pagination.Item
            onClick={() => prevPage()}
            disabled={currentPage === 1}
            id="paginate-btn"
          >
            &laquo; Prev
          </Pagination.Item>
          {pageNumbers.map((number, i) => {
            return (
              <Pagination.Item
                id="paginate-btn"
                key={i}
                onClick={() => paginate(number)}
                active={currentPage === number}
              >
                {number}
              </Pagination.Item>
            );
          })}
          <Pagination.Item
            onClick={() => nextPage()}
            disabled={currentPage === Math.ceil(totalJobs / jobsPerPage)}
            id="paginate-btn"
          >
            Next &raquo;
          </Pagination.Item>
        </Pagination>
      )}
    </div>
  );
};

export default PaginationBar;
