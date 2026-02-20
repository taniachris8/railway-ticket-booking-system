import "./FilterWidget.css";
import { useState } from "react";

export function FilterPriceSlider() {
  const MIN = 1920;
  const MAX = 7000;

  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [minSliderActive, setMinSliderActive] = useState(false);
  const [maxSliderActive, setMaxSliderActive] = useState(false);

  const getPercent = (value: number) => {
    return ((value - MIN) / (MAX - MIN)) * 100;
  };

  const minPercent = getPercent(minPrice);
  const maxPercent = getPercent(maxPrice);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSliderActive(true);
    const value = Number(e.target.value);
    if (value < maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSliderActive(true);
    const value = Number(e.target.value);
    if (value > minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="filter__price">
      <h5 className="filter__title filter__price-title">Стоимость</h5>

      <div className="filter__price-range-text">
        <span>от</span>
        <span>до</span>
      </div>

      <div className="filter__price-slider-wrapper">
        <div
          className="filter__price-track"
          style={{
            background: `linear-gradient(
              to right,
            transparent ${minPercent}%,
              #ffa800 ${minPercent}%,
              #ffa800 ${maxPercent}%,
              transparent ${maxPercent}%
            )`,
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minPrice}
          onChange={handleMinChange}
          className="filter__price-slider filter__price-slider--min"
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxPrice}
          onChange={handleMaxChange}
          className="filter__price-slider filter__price-slider--max"
        />
      </div>
      <div className="filter__price-values">
        {!minSliderActive ? (
          <span className="filter__price-min-value">{MIN}</span>
        ) : (
          <span
            className="filter__price-min-value"
            style={{ left: `${minPercent}%` }}>
            {minPrice}
          </span>
        )}

        {!maxSliderActive ? (
          <span className="filter__price-max-value">{MAX}</span>
        ) : (
          <span
            className="filter__price-max-value"
            style={{ left: `${maxPercent}%` }}>
            {maxPrice}
          </span>
        )}
      </div>
    </div>
  );
}
