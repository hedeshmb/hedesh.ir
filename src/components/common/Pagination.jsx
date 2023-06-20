import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Pagination = ({ itemCount, pageSize, currentPage, onPageChanged }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <Link
              className="page-link"
              onClick={() => onPageChanged(page)}
              to="#"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
