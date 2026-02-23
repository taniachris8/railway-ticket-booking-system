import "./FilterWidget.css";
import { useState } from "react";
import { MoreIcon } from "../../icons/MoreIcon";
import { LessIcon } from "../../icons/LessIcon";
import { FilterSlider } from "./FilterSlider";

type FilterDirectionProps = {
  title: string;
  iconSrc: string;
};

export function FilterDirection({ title, iconSrc }: FilterDirectionProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="filter__direction">
        <div className="filter__direction__header">
          <div className="filter__direction-wrapper">
            <img src={iconSrc} alt="icon" className="filter__icon" />
            <h5 className="filter__title">{title}</h5>
          </div>

          {opened ? (
            <LessIcon
              className="filter__icon-less"
              onClick={() => setOpened(false)}
            />
          ) : (
            <MoreIcon
              className="filter__icon-more"
              onClick={() => setOpened(true)}
            />
          )}
        </div>

        {opened && (
          <>
            <div className="filter__direction__slices">
              <FilterSlider
                MIN={0}
                MAX={24}
                sliderOuterClassName="filter-direction__slider-outer"
                trackHeight="10px"
                thumbClassName="filter-direction__thumb"
                sliderTextClassName="filter-direction__slider-text"
                time={true}>
                <h3 className="filter-direction__slider-title">
                  Время отбытия
                </h3>
              </FilterSlider>

              <FilterSlider
                MIN={0}
                MAX={24}
                sliderOuterClassName="filter-direction__slider-outer"
                trackHeight="10px"
                thumbClassName="filter-direction__thumb"
                sliderTextClassName="filter-direction__slider-text"
                time={true}>
                <h3 className="filter-direction__slider-title filter-direction__slider-title--right">
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
