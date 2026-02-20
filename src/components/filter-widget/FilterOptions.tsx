import "./FilterWidget.css";
import { ToggleSwitch } from "./ToggleSwitch";

export function FilterOptions() {

  return (
    <>
      <div className="filter__options">
        <ul className="filter__options-list">
          <li className="filter__options-item">
            <div className="filter__option">
              <img
                src="/icons/compartment.svg"
                alt=""
                className="filter__options-icon"
              />
              <p className="filter__options-name">Купе</p>
            </div>
            <ToggleSwitch />
          </li>

          <li className="filter__options-item">
            <div className="filter__option">
              <img
                src="/icons/general.svg"
                alt=""
                className="filter__options-icon"
              />
              <p className="filter__options-name">Плацкарт</p>
            </div>
            <ToggleSwitch />
          </li>

          <li className="filter__options-item">
            <div className="filter__option">
              <img
                src="/icons/seated.svg"
                alt=""
                className="filter__options-icon"
              />
              <p className="filter__options-name">Сидячий</p>
            </div>
            <ToggleSwitch />
          </li>
          <li className="filter__options-item">
            <div className="filter__option">
              <img
                src="/icons/luxe.svg"
                alt=""
                className="filter__options-icon"
              />
              <p className="filter__options-name">Люкс</p>
            </div>
            <ToggleSwitch />
          </li>
          <li className="filter__options-item">
            <div className="filter__option">
              <img
                src="/icons/wifi.svg"
                alt=""
                className="filter__options-icon"
              />
              <p className="filter__options-name">Wi-Fi</p>
            </div>
            <ToggleSwitch />
          </li>
          <li className="filter__options-item">
            <div className="filter__option">
              <img
                src="/icons/express.svg"
                alt=""
                className="filter__options-icon"
              />
              <p className="filter__options-name">Экспресс</p>
            </div>
            <ToggleSwitch />
          </li>
        </ul>
      </div>
    </>
  );
}
