import "./FilterSlider.css";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

type FilterSliderProps = {
  MIN: number;
  MAX: number;
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
  children,
  sliderOuterClassName,
  trackHeight,
  thumbClassName,
  sliderTextClassName,
  time,
}: FilterSliderProps) {
  const [values, setValues] = useState([MIN, MAX]);

  return (
    <>
      <div className="slider-wrapper">
        <div className={`slider-text ${sliderTextClassName}`}>{children}</div>
        <Range
          values={values}
          step={1}
          min={MIN}
          max={MAX}
          onChange={(vals) => setValues(vals)}
          onFinalChange={(vals) => setValues(vals)}
          renderTrack={({ props, children }) => (
            <div className={`slider-outer ${sliderOuterClassName}`}>
              <div
                {...props}
                className="slider-track"
                style={{
                  ...props.style,
                  height: trackHeight,
                  background: getTrackBackground({
                    values,
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
          {values[0] === MIN && (
            <span className="slider-min-static">
              {time ? `${MIN}:00` : MIN}
            </span>
          )}
          {values[0] !== MIN && (
            <span
              className="slider-value"
              style={{ left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%` }}>
              {time ? `${values[0]}:00` : values[0]}
            </span>
          )}
          {values[1] !== MAX && (
            <span
              className="slider-value"
              style={{ left: `${((values[1] - MIN) / (MAX - MIN)) * 100}%` }}>
              {time ? `${values[1]}:00` : values[1]}
            </span>
          )}
          <span className="slider-max-static">{time ? `${MAX}:00` : MAX}</span>
        </div>
      </div>
    </>
  );
}
