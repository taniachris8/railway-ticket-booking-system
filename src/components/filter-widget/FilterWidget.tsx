import "./FilterWidget.css"
import { DepartureDateInput } from "../date-inputs/DepartureDateInput";
import { ReturnDateInput } from "../date-inputs/ReturnDateInput";
import { FilterDirections } from "./FilterDirections";
import { FilterOptions } from "./FilterOptions";
import { FilterPriceSlider } from "./FilterPriceSlider";

export function FilterWidget() {
  return (
    <>
      <section className="filter">
        <div className="filter__dates">
          <div className="filter__date filter__date--departure">
            <h5 className="filter__title">Дата поездки</h5>
            <DepartureDateInput
              inputClassName="filter__date-input"
              inputFieldClassName="filter__date-input--field"
              iconClassName="filter__date-input--icon"
            />
          </div>
          <div className="filter__date filter__date--return">
            <h5 className="filter__title">Дата возвращения</h5>
            <ReturnDateInput
              inputClassName="filter__date-input"
              inputFieldClassName="filter__date-input--field"
              iconClassName="filter__date-input--icon"
            />
          </div>
        </div>

        <FilterOptions />
        <FilterPriceSlider />
      <FilterDirections/>
      </section>
    </>
  );
}
