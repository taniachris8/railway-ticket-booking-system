import styles from "./FilterOptions.module.css";
import { setFilterField } from "../../../state/reducers/filterSlice";
import type { RootState } from "../../../state/store";
import { ToggleSwitch } from "../toggle-switch/ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";

export function FilterOptions() {
  const dispatch = useDispatch();

  const {
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
  } = useSelector((state: RootState) => state.filters);

const handleChange = (key: keyof RootState["filters"], value: boolean) => {
  dispatch(setFilterField({ key, value }));
};

  return (
    <>
      <div className={ styles.options}>
        <ul className={ styles.options__list}>
          <li className={ styles.options__item}>
            <div className={ styles.option}>
              <img
                src="/icons/compartment.svg"
                alt=""
                className={ styles.options__icon }
              />
              <p className={ styles.options__name }>Купе</p>
            </div>
            <ToggleSwitch
              checked={have_second_class}
              onChange={(checked) => handleChange("have_second_class", checked)}
            />
          </li>

          <li className={ styles.options__item}>
            <div className={ styles.option}>
              <img
                src="/icons/general.svg"
                alt=""
                className={ styles.options__icon }
              />
              <p className={ styles.options__name }>Плацкарт</p>
            </div>
            <ToggleSwitch
              checked={have_third_class}
              onChange={(checked) => handleChange("have_third_class", checked)}
            />
          </li>

          <li className={ styles.options__item}>
            <div className={ styles.option}>
              <img
                src="/icons/seated.svg"
                alt=""
                className={ styles.options__icon }
              />
              <p className={ styles.options__name }>Сидячий</p>
            </div>
            <ToggleSwitch
              checked={have_fourth_class}
              onChange={(checked) => handleChange("have_fourth_class", checked)}
            />
          </li>
          <li className={ styles.options__item}>
            <div className={ styles.option}>
              <img
                src="/icons/luxe.svg"
                alt=""
                className={ styles.options__icon }
              />
              <p className={ styles.options__name }>Люкс</p>
            </div>
            <ToggleSwitch
              checked={have_first_class}
              onChange={(checked) => handleChange("have_first_class", checked)}
            />
          </li>
          <li className={ styles.options__item}>
            <div className={ styles.option}>
              <img
                src="/icons/wifi.svg"
                alt=""
                className={ styles.options__icon }
              />
              <p className={ styles.options__name }>Wi-Fi</p>
            </div>
            <ToggleSwitch
              checked={have_wifi}
              onChange={(checked) => handleChange("have_wifi", checked)}
            />
          </li>
          <li className={ styles.options__item}>
            <div className={ styles.option}>
              <img
                src="/icons/express.svg"
                alt=""
                className={ styles.options__icon }
              />
              <p className={ styles.options__name }>Экспресс</p>
            </div>
            <ToggleSwitch
              checked={have_express}
              onChange={(checked) => handleChange("have_express", checked)}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
