import { FilterSlider } from "../filter-slider/FilterSlider";

import styles from "./FilterPrice.module.css";

export function FilterPrice() {
  return (
    <>
      <div className={ styles.filter__price}>
        <h5 className={ styles.filter__price_title }>Стоимость</h5>
        <FilterSlider
          MIN={1920}
          MAX={7000}
          fromKey="price_from"
          toKey="price_to"
          sliderOuterClassName={ styles.filter__price__slider_outer }
          trackHeight="19px"
          thumbClassName={ styles.filter__price_thumb }
          sliderTextClassName={ styles.filter__price__slider_text }
          time={false}>
          <span>от</span>
          <span>до</span>
        </FilterSlider>
      </div>
    </>
  );
}
