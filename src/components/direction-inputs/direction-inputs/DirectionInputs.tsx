import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import type { RootState } from "../../../state/store";

import { setTicketField } from "../../../state/reducers/ticketsSlice";
import { setFilterField } from "../../../state/reducers/filterSlice";

import { DepartureInput } from "../departure-input/DepartureInput";
import { DestinationInput } from "../destination-input/DestinationInput";

import styles from "./DirectionInputs.module.css";

type DirectionInputsProps = {
  visibleFromCityTooltip: boolean;
  visibleToCityTooltip: boolean;
};

export function DirectionInputs({
  visibleFromCityTooltip,
  visibleToCityTooltip
}: DirectionInputsProps) {
  const dispatch = useDispatch();
  const { from_city, to_city } = useSelector(
    (state: RootState) => state.tickets,
  );
  const { from_city_id, to_city_id } = useSelector(
    (state: RootState) => state.filters,
  );

  const handleSwitchCities = () => {
    if (!from_city || !to_city) return;
    dispatch(setFilterField({ key: "from_city_id", value: to_city_id }));
    dispatch(setTicketField({ key: "from_city", value: to_city }));
    dispatch(setFilterField({ key: "to_city_id", value: from_city_id }));
    dispatch(setTicketField({ key: "to_city", value: from_city }));
  };

  return (
    <>
      <div className={styles.direction}>
        <label htmlFor="">Направление</label>
        <div className={styles.direction__inputs}>
          <Tippy
            content="Выберите город отправления"
            visible={visibleFromCityTooltip}
            placement="bottom-start">
            <div>
              <DepartureInput
                containerClassName={`${styles.direction__input} ${styles.direction__input_from}`}
                inputClassName={styles.direction__input_field}
                iconClassName={styles.direction__icon}
              />
            </div>
          </Tippy>
          <img
            onClick={handleSwitchCities}
            src="/icons/ic_cached_white_48dp.png"
            alt=""
            className={styles.direction__switcher}
          />
          <Tippy
            content="Выберите город назначения"
            visible={visibleToCityTooltip}
            placement="bottom-start">
            <div>
              <DestinationInput
                containerClassName={`${styles.direction__input} ${styles.direction__input_to}`}
                inputClassName={styles.direction__input_field}
                iconClassName={styles.direction__icon}
              />
            </div>
          </Tippy>
        </div>
      </div>
    </>
  );
}
