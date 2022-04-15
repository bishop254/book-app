import React from "react";
import "./Pagination.css";

//paginate is a function that will update our view as the user navigates through the pages.
const Pagination = ({ pagesToDisplay, totalPages, paginate }) => {
  const pageNumbers = [];
  const pageCount = Math.ceil(totalPages / pagesToDisplay);

  for (let page = 1; page <= pageCount; page++) {
    pageNumbers.push(page);
  }

  return (
    <div className="pagesDiv">
      <nav>
        <ul className="pagesList">
          {pageNumbers.map((pageNo) => (
            <li className="pageNumber">
              <a href="!#" onClick={() => paginate(pageNo)}>
                {pageNo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
