import styles from "./FilterWidget.module.css";
import { DepartureDateInput } from "../date-inputs/DepartureDateInput";
import { ReturnDateInput } from "../date-inputs/ReturnDateInput";
import { FilterDirection } from "./filter-direction/FilterDirection";
import { FilterOptions } from "./filter-options/FilterOptions";
import { FilterPrice } from "./filter-price/FilterPrice";

export function FilterWidget() {
  return (
    <>
      <section className={ styles.filter}>
        <div className={ styles.filter__dates}>
          <div className={ `${styles.filter__date} ${styles.filter__date_departure}`}>
            <h3 className={ styles.filter__title }>Дата поездки</h3>
            <DepartureDateInput
              inputClassName={ styles.filter__date_input }
              inputFieldClassName={ styles.input__field }
              iconClassName={ styles.input__icon }
            />
          </div>
          <div className={ `${styles.filter__date} ${styles.filter__date_return}` }>
            <h3 className={ styles.filter__title }>Дата возвращения</h3>
            <ReturnDateInput
              inputClassName={ styles.filter__date_input }
              inputFieldClassName={ styles.input__field }
              iconClassName={ styles.input__icon }
            />
          </div>
        </div>

        <FilterOptions />
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
      </section>
    </>
  );
}
