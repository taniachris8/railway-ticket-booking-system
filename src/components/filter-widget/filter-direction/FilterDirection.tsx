import { FilterSlider } from "../filter-slider/FilterSlider";

import { TripCollapsibleSection } from "../../trip-collapsible-section/TripCollapsibleSection";

import styles from "./FilterDirection.module.css";

type FilterDirectionProps = {
  title: string;
  iconSrc: string;
  base: "departure" | "arrival";
};

export function FilterDirection({
  title,
  iconSrc,
  base,
}: FilterDirectionProps) {
  return (
    <>
      <TripCollapsibleSection title={title} iconSrc={iconSrc}>
        <FilterSlider
          MIN={0}
          MAX={24}
          fromKey={`start_${base}_hour_from`}
          toKey={`start_${base}_hour_to`}
          sliderOuterClassName={styles.filter__direction__slider_outer}
          trackHeight="10px"
          thumbClassName={styles.filter__direction_thumb}
          sliderTextClassName={styles.filter__direction__slider_text}
          time={true}>
          <h3 className={styles.filter__direction__slider_title}>
            Время отбытия
          </h3>
        </FilterSlider>

        <FilterSlider
          MIN={0}
          MAX={24}
          fromKey={`end_${base}_hour_from`}
          toKey={`end_${base}_hour_to`}
          sliderOuterClassName={styles.filter__direction__slider_outer}
          trackHeight="10px"
          thumbClassName={styles.filter__direction_thumb}
          sliderTextClassName={styles.filter__direction__slider_text}
          time={true}>
          <h3
            className={`${styles.filter__direction__slider_title} ${styles.filter__direction__slider_title_right}`}>
            Время прибытия
          </h3>
        </FilterSlider>
      </TripCollapsibleSection>
    </>
  );
}
