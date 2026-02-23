import "./FilterWidget.css";
import { DepartureDateInput } from "../date-inputs/DepartureDateInput";
import { ReturnDateInput } from "../date-inputs/ReturnDateInput";
import { FilterDirection } from "./FilterDirection";
import { FilterOptions } from "./FilterOptions";
import { FilterPrice } from "./FilterPrice";

export function FilterWidget() {
  return (
    <>
      <section className="filter">
        <div className="filter__dates">
          <div className="filter__date filter__date--departure">
            <h3 className="filter__title">Дата поездки</h3>
            <DepartureDateInput
              inputClassName="filter__date-input"
              inputFieldClassName="filter__date-input--field"
              iconClassName="filter__date-input--icon"
            />
          </div>
          <div className="filter__date filter__date--return">
            <h3 className="filter__title">Дата возвращения</h3>
            <ReturnDateInput
              inputClassName="filter__date-input"
              inputFieldClassName="filter__date-input--field"
              iconClassName="filter__date-input--icon"
            />
          </div>
        </div>

        <FilterOptions />
        <FilterPrice />
        <FilterDirection iconSrc="/icons/filter-to.svg" title="Туда" />
        <FilterDirection iconSrc="/icons/filter-back.svg" title="Обратно" />
      </section>
    </>
  );
}
