import { Range, getTrackBackground } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setFilterField } from "../../../state/reducers/filterSlice";
import type { FilterState } from "../../../state/reducers/filterSlice";

import type { RootState } from "../../../state/store";

import "./FilterSlider.css";

type FilterSliderProps = {
  MIN: number;
  MAX: number;
  fromKey: keyof FilterState;
  toKey: keyof FilterState;
  children?: React.ReactNode;
  sliderOuterClassName: string;
  trackHeight: string;
  thumbClassName: string;
  sliderTextClassName: string;
  time: boolean;
};

export function FilterSlider({
  MIN,
  MAX,
  fromKey,
  toKey,
  children,
  sliderOuterClassName,
  trackHeight,
  thumbClassName,
  sliderTextClassName,
  time,
}: FilterSliderProps) {
  const dispatch = useDispatch();

  const fromValue = useSelector((state: RootState) => state.filters[fromKey]);
  const toValue = useSelector((state: RootState) => state.filters[toKey]);

  const safeMin = Math.min(MIN, MAX - 1);
  const safeMax = Math.max(MAX, MIN + 1);

  const [tempValues, setTempValues] = useState<number[] | null>(null);

  const currentValues = tempValues ?? [fromValue, toValue];

  const handleFinalChange = (vals: number[]) => {
    dispatch(setFilterField({ key: fromKey, value: vals[0] }));
    dispatch(setFilterField({ key: toKey, value: vals[1] }));
    setTempValues(null);
  };

  return (
    <div className="slider-wrapper">
      <div className={`slider-text ${sliderTextClassName}`}>{children}</div>

      <Range
        values={currentValues}
        step={1}
        min={safeMin}
        max={safeMax}
        onChange={(vals) => setTempValues(vals)}
        onFinalChange={handleFinalChange}
        renderTrack={({ props, children }) => (
          <div className={`slider-outer ${sliderOuterClassName}`}>
            <div
              {...props}
              className="slider-track"
              style={{
                ...props.style,
                height: trackHeight,
                background: getTrackBackground({
                  values: currentValues,
                  colors: ["transparent", "#ffa800", "transparent"],
                  min: MIN,
                  max: MAX,
                }),
              }}>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className={`slider-thumb ${thumbClassName}`} />
        )}
      />

      <div className="slider-values">
        {currentValues[0] === safeMin ? (
          <span className="slider-min-static">
            {time ? `${safeMin}:00` : safeMin}
          </span>
        ) : (
          <span
            className="slider-value"
            style={{
              left: `${((currentValues[0] - safeMin) / (safeMax - safeMin)) * 100}%`,
            }}>
            {time ? `${currentValues[0]}:00` : currentValues[0]}
          </span>
        )}

        {currentValues[1] !== safeMax && (
          <span
            className="slider-value"
            style={{
              left: `${((currentValues[1] - safeMin) / (safeMax - safeMin)) * 100}%`,
            }}>
            {time ? `${currentValues[1]}:00` : currentValues[1]}
          </span>
        )}

        <span className="slider-max-static">{time ? `${MAX}:00` : MAX}</span>
      </div>
    </div>
  );
}