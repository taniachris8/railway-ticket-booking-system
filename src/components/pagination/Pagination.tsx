import "./Pagination.css";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { PaginationLeftArrow } from "../../icons/PaginationLeftArrow";
import { PaginationRightArrow } from "../../icons/PaginationRightArrow";

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 10;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <ReactPaginate
      previousLabel={
        <div className="pagination__item">
          <PaginationLeftArrow width="18px" height="29px" />
        </div>
      }
      nextLabel={
        <div className="pagination__item">
          <PaginationRightArrow width="18px" height="29px" />
        </div>
      }
      pageCount={pageCount}
      onPageChange={handlePageClick}
      forcePage={currentPage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={"pagination"}
      pageClassName={"pagination__item"}
      pageLinkClassName={"pagination__item-number"}
      activeClassName={"pagination__item--active"}
      breakClassName={"pagination__item-ellipsis"}
      breakLabel={
        <div className="pagination__item pagination__item-ellipsis">
          <div className="pagination__item-ellipse"></div>
          <div className="pagination__item-ellipse"></div>
          <div className="pagination__item-ellipse"></div>
        </div>
      }
    />
  );
}
