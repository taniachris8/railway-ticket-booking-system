import styles from "./TicketsQuantityItem.module.css";
import type { RootState } from "../../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { setSeatsField, type SeatsState } from "../../../state/reducers/seatsSlice";

export type TicketItem = {
  type: string;
  maxCount: number;
  info?: string;
  keyLabel: keyof SeatsState;
};

type TicketsQuantityItemProps = {
  type: string;
  maxCount: number;
  info?: string;
  active: boolean;
  keyLabel: keyof SeatsState;
  onClick: () => void;
};

export function TicketsQuantityItem({
  type,
  maxCount,
  info,
  active,
  keyLabel,
  onClick,
}: TicketsQuantityItemProps) {
  const dispatch = useDispatch();

  const { adultCount, childCount, infantCount } = useSelector(
    (state: RootState) => state.seats,
  );

   const currentCount =
     keyLabel === "adultCount"
       ? adultCount
       : keyLabel === "childCount"
         ? childCount
         : infantCount;

  const increment = () => {
    if (currentCount < maxCount) {
      dispatch(setSeatsField({ key: keyLabel, value: currentCount + 1 }));
    }
  };

  const decrement = () => {
    if (currentCount > 0) {
      dispatch(setSeatsField({ key: keyLabel, value: currentCount - 1 }));
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${styles.tickets__quantity_item} ${
        active
          ? styles.tickets__quantity_item_active
          : currentCount > 0
            ? styles.tickets__quantity_item_chosen
            : ""
      }`}>
      <div className={styles.tickets__quantity_wrapper}>
        <p className={styles.tickets__quantity_type}>{type}</p>

        {active && (
          <button
            className={styles.tickets__quantity_button}
            type="button"
            onClick={decrement}>
            -
          </button>
        )}

        <span className={styles.tickets__quantity_current}>
          {currentCount}
        </span>

        {active && (
          <button
            className={styles.tickets__quantity_button}
            type="button"
            onClick={increment}>
            +
          </button>
        )}
      </div>

      {info && <p className={styles.tickets__quantity_info}>{info}</p>}
    </div>
  );
}
