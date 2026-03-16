import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../state/store";

import { setFilterField } from "../../state/reducers/filterSlice";

import { PaginationLeftArrow } from "../../icons/PaginationLeftArrow";
import { PaginationRightArrow } from "../../icons/PaginationRightArrow";

import styles from "./Pagination.module.css";

type PaginationProps = {
  totalCount: number;
};

export function Pagination({ totalCount }: PaginationProps) {
  const dispatch = useDispatch();
  const { limit, offset } = useSelector((state: RootState) => state.filters);

  const pageCount = Math.ceil(totalCount / Number(limit));
  const currentPage = Math.floor(offset / Number(limit));

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = selected * Number(limit);
    dispatch(setFilterField({ key: "offset", value: newOffset }));
  };

  return (
    <ReactPaginate
      previousLabel={
        <div className={styles.pagination__item}>
          <PaginationLeftArrow width="18px" height="29px" />
        </div>
      }
      nextLabel={
        <div className={styles.pagination__item}>
          <PaginationRightArrow width="18px" height="29px" />
        </div>
      }
      pageCount={pageCount}
      onPageChange={handlePageClick}
      forcePage={currentPage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={styles.pagination}
      pageClassName={styles.pagination__item}
      pageLinkClassName={styles.pagination__item_number}
      activeClassName={styles.pagination__item_active}
      breakClassName={styles.pagination__item_ellipsis}
      breakLabel={
        <div
          className={`${styles.pagination__item} ${styles.pagination__item_ellipsis}`}>
          <div className={styles.pagination__item_ellipse}></div>
          <div className={styles.pagination__item_ellipse}></div>
          <div className={styles.pagination__item_ellipse}></div>
        </div>
      }
    />
  );
}
