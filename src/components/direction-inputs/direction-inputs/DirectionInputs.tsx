import styles from "./DirectionInputs.module.css";
import { DepartureInput } from "../DepartureInput";
import { DestinationInput } from "../DestinationInput";
import { setTicketField } from "../../../state/reducers/ticketsSlice";
import { setFilterField } from "../../../state/reducers/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../state/store";

export function DirectionInputs() {
  const dispatch = useDispatch();
  const { from_city, to_city } = useSelector(
    (state: RootState) => state.tickets,
  );
  const { from_city_id, to_city_id } = useSelector(
    (state: RootState) => state.filters,
  );

  const handleSwitchCities = () => {
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
          <DepartureInput
            containerClassName={`${styles.direction__input} ${styles.direction__input_from}`}
            inputClassName={styles.direction__input_field}
            iconClassName={styles.direction__icon}
          />
          <img
            onClick={handleSwitchCities}
            src="/icons/ic_cached_white_48dp.png"
            alt=""
            className={styles.direction__switcher}
          />
          <DestinationInput
            containerClassName={`${styles.direction__input} ${styles.direction__input_to}`}
            inputClassName={styles.direction__input_field}
            iconClassName={styles.direction__icon}
          />
        </div>
      </div>
    </>
  );
}
