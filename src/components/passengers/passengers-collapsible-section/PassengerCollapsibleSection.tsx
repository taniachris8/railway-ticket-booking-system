import { useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { Price } from "../../price/Price";

import styles from "./PassengerCollapsibleSection.module.css";

type PassengerCollapsibleSectionProps = {
  priceForEachPassenger: (passengerIndex: number) => number;
};

export function PassengerCollapsibleSection({
  priceForEachPassenger,
}: PassengerCollapsibleSectionProps) {
  const { departure } = useSelector((state: RootState) => state.seats);
  const { adultCount, childCount, infantCount } = departure;

  const passengerTypes = [
    { type: "Взрослый", count: adultCount },
    { type: "Ребенок", count: childCount },
    { type: "Младенец", count: infantCount },
  ];

  const existingPassengerTypes = passengerTypes.filter(
    (passenger) => passenger.count > 0,
  );

  const formatPassengerType = (type: string, count: number): string => {
    if (type === "Взрослый") {
      return `${count} ${count === 1 ? "Взрослый" : "Взрослых"}`;
    }

    if (type === "Ребенок") {
      return `${count} ${
        count === 1 ? "Ребенок" : count >= 2 && count <= 4 ? "Ребенка" : "Детей"
      }`;
    }

    if (type === "Младенец") {
      return `${count} ${
        count === 1
          ? "Младенец"
          : count >= 2 && count <= 4
            ? "Младенца"
            : "Младенцев"
      }`;
    }

    return "";
  };

  return (
    <>
      <div className={styles.container}>
        {existingPassengerTypes.map((passenger, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.type}>
              <span className={styles.label}>
                {formatPassengerType(passenger.type, passenger.count)}
              </span>
            </div>
            <div className={styles.price}>
              <Price
                amount={
                  passenger.type === "Младенец"
                    ? 0
                    : priceForEachPassenger(index)
                }
                amountClassName={styles.price_value}
                iconClassName={styles.price_icon}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
