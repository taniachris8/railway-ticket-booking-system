import { ToggleSwitch } from "../toggle-switch/ToggleSwitch";
import { getPublicAssetPath } from "../../../utils/getPublicAssetPath";

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
                src={getPublicAssetPath("/icons/compartment.svg")}
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Купе</p>
            </div>
            <ToggleSwitch
              checked={filters.have_second_class}
              onChange={(checked) => {
                if (handleCarriageTypeChange) {
                  handleCarriageTypeChange("second");
                } else {
                  onChange("have_second_class", checked);
                }
              }}
            />
          </li>

          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src={getPublicAssetPath("/icons/general.svg")}
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Плацкарт</p>
            </div>
            <ToggleSwitch
              checked={filters.have_third_class}
              onChange={(checked) => {
                if (handleCarriageTypeChange) {
                  handleCarriageTypeChange("third");
                } else {
                  onChange("have_third_class", checked);
                }
              }}
            />
          </li>

          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src={getPublicAssetPath("/icons/seated.svg")}
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Сидячий</p>
            </div>
            <ToggleSwitch
              checked={filters.have_fourth_class}
              onChange={(checked) => {
                if (handleCarriageTypeChange) {
                  handleCarriageTypeChange("fourth");
                } else {
                  onChange("have_fourth_class", checked);
                }
              }}
            />
          </li>
          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src={getPublicAssetPath("/icons/luxe.svg")}
                alt=""
                className={styles.options__icon}
              />
              <p className={styles.options__name}>Люкс</p>
            </div>
            <ToggleSwitch
              checked={filters.have_first_class}
              onChange={(checked) => {
                if (handleCarriageTypeChange) {
                  handleCarriageTypeChange("first");
                } else {
                  onChange("have_first_class", checked);
                }
              }}
            />
          </li>
          <li className={styles.options__item}>
            <div className={styles.option}>
              <img
                src={getPublicAssetPath("/icons/wifi.svg")}
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
                src={getPublicAssetPath("/icons/express.svg")}
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
