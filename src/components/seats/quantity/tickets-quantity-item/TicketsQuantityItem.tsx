import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../../state/store";

import { setPassengers } from "../../../../state/reducers/seatsSlice";
import { Module } from "../../../module/Module";

import styles from "./TicketsQuantityItem.module.css";

type PassengerKey = "adultCount" | "childCount" | "infantCount";

export type TicketItem = {
  type: string;
  maxCount: number;
  info?: string;
  keyLabel: PassengerKey;
};

type TicketsQuantityItemProps = TicketItem & {
  active: boolean;
  onClick: () => void;
  direction: "departure" | "arrival";
};

export function TicketsQuantityItem({
  type,
  maxCount,
  info,
  active,
  keyLabel,
  onClick,
  direction,
}: TicketsQuantityItemProps) {
  const dispatch = useDispatch();

  const { adultCount, childCount, infantCount } = useSelector(
    (state: RootState) => state.seats[direction],
  );
  const [showWarningModule, setShowWarningModule] = useState(false);

  const currentCount =
    keyLabel === "adultCount"
      ? adultCount
      : keyLabel === "childCount"
        ? childCount
        : infantCount;

  const increment = () => {
    if (currentCount < maxCount) {
      if (adultCount === 0 && keyLabel === "childCount") {
        setShowWarningModule(true);
        return;
      }
      dispatch(
        setPassengers({
          direction,
          [keyLabel]: currentCount + 1,
        }),
      );
    }
  };

  const decrement = () => {
    if (currentCount > 0) {
      dispatch(
        setPassengers({
          direction,
          [keyLabel]: currentCount - 1,
        }),
      );
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

        <span className={styles.tickets__quantity_current}>{currentCount}</span>

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
      {showWarningModule && (
        <Module
          message="Пожалуйста, сначала добавьте хотя бы одного взрослого пассажира"
          type="info"
          onClick={() => setShowWarningModule(false)}
        />
      )}
    </div>
  );
}
