import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import type { RootState } from "../../state/store";
import { setFilterField } from "../../state/reducers/filterSlice";

import styles from "./FilterToolbar.module.css";

type FilterToolbarProps = {
  totalCount: number;
};

export function FilterToolbar({ totalCount }: FilterToolbarProps) {
  const dispatch = useDispatch();
  const [openToolbarSort, setOpenToolbarSort] = useState(false);
  const limit = useSelector((state: RootState) => state.filters.limit);
  const sort = useSelector((state: RootState) => state.filters.sort);

  const limits = ["5", "10", "20"];

  const sortOptions = [
    { value: "date", label: "времени" },
    { value: "price", label: "стоимости" },
    { value: "duration", label: "длительности" },
  ] as const;

  return (
    <div className={styles.toolbar}>
      <p className={styles.toolbar__results}>
        найдено {totalCount && totalCount}
      </p>

      <div className={styles.toolbar__controls}>
        <div className={styles.toolbar__sort}>
          сортировать по:
          <div
            className={styles.toolbar__sort__container}
            onClick={() => setOpenToolbarSort(!openToolbarSort)}>
            {!openToolbarSort ? (
              <div className={styles.toolbar__sort__selected}>
                {sortOptions.find((option) => option.value === sort)?.label}
              </div>
            ) : (
              <>
                <ul className={styles.toolbar__sort__list}>
                  {sortOptions.map((option, index) => (
                    <li
                      key={index}
                      className={
                        sort === option.value
                          ? `${styles.toolbar__sort__item} ${styles.active}`
                          : styles.toolbar__sort__item
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenToolbarSort(false);
                        dispatch(
                          setFilterField({
                            key: "sort",
                            value: option.value,
                          }),
                        );
                      }}>
                      <p>{option.label}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className={styles.toolbar__limit}>
          <span className={styles.toolbar__limit_text}>показывать по: </span>
          {limits.map((l, index) => (
            <button
              key={index}
              onClick={() =>
                dispatch(setFilterField({ key: "limit", value: l }))
              }
              className={
                limit === l
                  ? `${styles.toolbar__limit_option} ${styles.active}`
                  : styles.toolbar__limit_option
              }>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
