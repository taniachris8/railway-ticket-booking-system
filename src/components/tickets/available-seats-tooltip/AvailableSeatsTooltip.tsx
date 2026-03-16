import type { SeatPriceType } from "../../../types";

import { Price } from "../../price/Price";

import styles from "./AvailableSeatsTooltip.module.css";

type AvailableSeatsTooltipProps = {
  availableSeats: SeatPriceType;
};

export function AvailableSeatsTooltip({
  availableSeats,
}: AvailableSeatsTooltipProps) {
  const { bottom_price, top_price, side_price } = availableSeats;

  return (
    <>
      <div className={styles.seats}>
        {top_price && (
          <div className={styles.seat}>
            <p className={styles.seat__type}>верхние</p>
            <span className={styles.seat__count}>19</span>
            <Price
              amount={top_price}
              amountClassName={styles.seat__value}
              iconClassName={styles.seat__currency}
            />
          </div>
        )}
        {bottom_price && (
          <div className={styles.seat}>
            <p className={styles.seat__type}>нижние</p>
            <span className={styles.seat__count}>19</span>
            <Price
              amount={bottom_price}
              amountClassName={styles.seat__value}
              iconClassName={styles.seat__currency}
            />
          </div>
        )}
        {side_price && (
          <div className={styles.seat}>
            <p className={styles.seat__type}>боковые</p>
            <span className={styles.seat__count}>19</span>
            <Price
              amount={side_price}
              amountClassName={styles.seat__value}
              iconClassName={styles.seat__currency}
            />
          </div>
        )}
      </div>
    </>
  );
}
