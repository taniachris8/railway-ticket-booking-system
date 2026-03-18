import type { SeatsInfoType } from "../../../types";

import {
  calculateAvailableTopSeats,
  calculateAvailableBottomSeats,
  calculateAvailableSideSeats,
} from "../../../utils/calculateAvailableSeats";

import { Price } from "../../price/Price";

import styles from "./AvailableSeatsTooltip.module.css";

type AvailableSeatsTooltipProps = {
  carriages: SeatsInfoType[];
  class_type: string;
};

export function AvailableSeatsTooltip({
  carriages,
  class_type,
}: AvailableSeatsTooltipProps) {
  let topSeatsCount = 0;
  let bottomSeatsCount = 0;
  let sideSeatsCount = 0;

  for (const coach of carriages) {
    topSeatsCount += calculateAvailableTopSeats(coach.seats);
    bottomSeatsCount += calculateAvailableBottomSeats(coach.seats);

    if (class_type === "third") {
      sideSeatsCount += calculateAvailableSideSeats(coach.seats);
    }
  }

  const getMinPrice = (key: "top_price" | "bottom_price" | "side_price") => {
    const prices = carriages
      .map((c) => Number(c.coach[key]) || 0)
      .filter((p) => p > 0);

    return prices.length ? Math.min(...prices) : 0;
  };

  const topPrice = getMinPrice("top_price");
  const bottomPrice = getMinPrice("bottom_price");
  const sidePrice = getMinPrice("side_price");

  return (
    <>
      <div className={styles.seats}>
        {topPrice > 0 && topSeatsCount > 0 && (
          <div className={styles.seat}>
            <p className={styles.seat__type}>верхние</p>
            <span className={styles.seat__count}>{topSeatsCount}</span>
            <Price
              amount={topPrice}
              amountClassName={styles.seat__value}
              iconClassName={styles.seat__currency}
            />
          </div>
        )}

        {bottomPrice > 0 && bottomSeatsCount > 0 && (
          <div className={styles.seat}>
            <p className={styles.seat__type}>нижние</p>
            <span className={styles.seat__count}>{bottomSeatsCount}</span>
            <Price
              amount={bottomPrice}
              amountClassName={styles.seat__value}
              iconClassName={styles.seat__currency}
            />
          </div>
        )}

        {class_type === "third" && sidePrice > 0 && sideSeatsCount > 0 && (
          <div className={styles.seat}>
            <p className={styles.seat__type}>боковые</p>
            <span className={styles.seat__count}>{sideSeatsCount}</span>
            <Price
              amount={sidePrice}
              amountClassName={styles.seat__value}
              iconClassName={styles.seat__currency}
            />
          </div>
        )}
      </div>
    </>
  );
}
