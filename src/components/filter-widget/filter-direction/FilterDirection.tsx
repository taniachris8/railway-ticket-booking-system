import styles from "./FilterDirection.module.css";
import { useState } from "react";
import { MoreIcon } from "../../../icons/MoreIcon";
import { LessIcon } from "../../../icons/LessIcon";
import { FilterSlider } from "../filter-slider/FilterSlider";

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
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.filter__direction}>
        <div className={styles.filter__direction_header}>
          <div className={styles.filter__direction_wrapper}>
            <img src={iconSrc} alt="icon" className={styles.filter__icon} />
            <h5 className={styles.filter__title}>{title}</h5>
          </div>

          {opened ? (
            <LessIcon
              className={styles.filter__icon_less}
              onClick={() => setOpened(false)}
            />
          ) : (
            <MoreIcon
              className={styles.filter__icon_more}
              onClick={() => setOpened(true)}
            />
          )}
        </div>

        {opened && (
          <>
            <div className={styles.filter__direction_slices}>
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
