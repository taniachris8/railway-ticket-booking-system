import { ToggleSwitch } from "../toggle-switch/ToggleSwitch";

import styles from "./FilterOptions.module.css";

type Filters = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_express: boolean;
};

type FilterOptionsProps = {
  filters: Filters;
  onChange: (key: keyof Filters, value: boolean) => void;
  handleCarriageTypeChange: (
    id: "first" | "second" | "third" | "fourth",
  ) => void;
};

export function FilterOptions({
  filters,
  onChange,
  handleCarriageTypeChange,
}: FilterOptionsProps) {
  return (
    <>
      <div className={styles.options}>
        <ul className={styles.options__list}>
          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src="/icons/compartment.svg"
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Купе</p>
            </div>
            <ToggleSwitch
              checked={filters.have_second_class}
              onChange={() => handleCarriageTypeChange("second")}
            />
          </li>

          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src="/icons/general.svg"
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Плацкарт</p>
            </div>
            <ToggleSwitch
              checked={filters.have_third_class}
              onChange={() => handleCarriageTypeChange("third")}
            />
          </li>

          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src="/icons/seated.svg"
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Сидячий</p>
            </div>
            <ToggleSwitch
              checked={filters.have_fourth_class}
              onChange={() => handleCarriageTypeChange("fourth")}
            />
          </li>
          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src="/icons/luxe.svg"
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Люкс</p>
            </div>
            <ToggleSwitch
              checked={filters.have_first_class}
              onChange={() => handleCarriageTypeChange("first")}
            />
          </li>
          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src="/icons/wifi.svg"
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Wi-Fi</p>
            </div>
            <ToggleSwitch
              checked={filters.have_wifi}
              onChange={(checked) => onChange("have_wifi", checked)}
            />
          </li>
          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src="/icons/express.svg"
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Экспресс</p>
            </div>
            <ToggleSwitch
              checked={filters.have_express}
              onChange={(checked) => onChange("have_express", checked)}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
