import { useState } from "react";
import { DepartureDateInput } from "./date/DepartureDateInput";
import { ReturnDateInput } from "./date/ReturnDateInput";
import { ToggleSwitch } from "./ToggleSwitch";

export function FilterWidget() {
  const [compartment, setCompartment] = useState(false);
  const [general, setGeneral] = useState(false);
  const [seated, setSeated] = useState(false);
  const [luxe, setLuxe] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [express, setExpress] = useState(false);

  return (
    <>
      <section className="filter">
        <div className="filter__dates">
          <div className="filter__date filter__date--departure">
            <h5 className="filter__title">Дата поездки</h5>
            <DepartureDateInput />
          </div>
          <div className="filter__date filter__date--return">
            <h5 className="filter__title">Дата возвращения</h5>
            <ReturnDateInput />
          </div>
        </div>

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

        <div className="filter__price">
          <h5 className="filter__title">Стоимость</h5>
        </div>

        <div className="filter__direction filter__direction--to">
          <img src="" alt="" className="filter__icon" />
          <h5 className="filter__title">Туда</h5>
          <img src="" alt="" className="filter__icon" />
        </div>

        <div className="filter__direction filter__direction--back">
          <img src="" alt="" className="filter__icon" />
          <h5 className="filter__title">Обратно</h5>
          <img src="" alt="" className="filter__icon" />
        </div>
      </section>
    </>
  );
}
