import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../state/store";

import { setFilterField } from "../../state/reducers/filterSlice";
import { setSeatsFiltersField } from "../../state/reducers/filterSeatsSlice";

import { AsideContainer } from "../aside-container/AsideContainer";
import { DepartureDateInput } from "../date-inputs/departure-date-input/DepartureDateInput";
import { ReturnDateInput } from "../date-inputs/return-date-input/ReturnDateInput";
import { FilterDirection } from "./filter-direction/FilterDirection";
import { FilterOptions } from "./filter-options/FilterOptions";
import { FilterPrice } from "./filter-price/FilterPrice";

import styles from "./FilterWidget.module.css";

export function FilterWidget({
  filterType,
  handleCarriageTypeChange,
}: {
  filterType: "filters" | "seatsFilters";
  handleCarriageTypeChange?: (
    id: "first" | "second" | "third" | "fourth",
  ) => void;
}) {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state[filterType]);

  const handleChange = (key: keyof typeof filters, value: boolean) => {
    if (filterType === "filters") {
      dispatch(setFilterField({ key, value }));
    } else {
      dispatch(setSeatsFiltersField({ key, value }));
    }
  };

  return (
    <>
      <AsideContainer>
        <div className={styles.filter__dates}>
          <div
            className={`${styles.filter__date} ${styles.filter__date_departure}`}>
            <h3 className={styles.filter__title}>Дата поездки</h3>
            <DepartureDateInput
              inputClassName={styles.filter__date_input}
              inputFieldClassName={styles.input__field}
              iconClassName={styles.input__icon}
            />
          </div>
          <div
            className={`${styles.filter__date} ${styles.filter__date_return}`}>
            <h3 className={styles.filter__title}>Дата возвращения</h3>
            <ReturnDateInput
              inputClassName={styles.filter__date_input}
              inputFieldClassName={styles.input__field}
              iconClassName={styles.input__icon}
            />
          </div>
        </div>

        <FilterOptions
          filters={filters}
          onChange={handleChange}
          handleCarriageTypeChange={handleCarriageTypeChange}
        />
        <FilterPrice />
        <FilterDirection
          iconSrc="/icons/filter-to.svg"
          title="Туда"
          base="departure"
        />
        <FilterDirection
          iconSrc="/icons/filter-back.svg"
          title="Обратно"
          base="arrival"
        />
      </AsideContainer>
    </>
  );
}
