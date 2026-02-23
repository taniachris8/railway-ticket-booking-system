import "./FilterWidget.css";
import { FilterSlider } from "./FilterSlider";

export function FilterPrice() {
  const MIN = 1920;
  const MAX = 7000;

  return (
    <>
      <div className="filter__price">
        <h5 className="filter__title filter__price-title">Стоимость</h5>
        <FilterSlider
          MIN={MIN}
          MAX={MAX}
          sliderOuterClassName="filter-price__slider-outer"
          trackHeight="19px"
          thumbClassName="filter-price__thumb"
          sliderTextClassName="filter-price__slider-text" time={ false}>
          <span>от</span>
          <span>до</span>
        </FilterSlider>
      </div>
    </>
  );
}
