import { useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { formatDateForDisplaying } from "../../../utils/formatDateForDisplaying";
import { calculateTotalPrice } from "../../../utils/calculateTotalPrice";

import { AsideContainer } from "../../aside-container/AsideContainer";
import { TripCollapsibleSection } from "../../trip-collapsible-section/TripCollapsibleSection";
import { PassengerCollapsibleSection } from "../passengers-collapsible-section/PassengerCollapsibleSection";
import { Price } from "../../price/Price";
import { Direction } from "../../direction/Direction";

import styles from "./AsideWidget.module.css";

export function AsideWidget() {
  const arrivalTrain = useSelector(
    (state: RootState) => state.seats.arrivalTrain,
  );

  const { date_start, date_start_arrival } = useSelector(
    (state: RootState) => state.filters,
  );

  const selectedCoaches = useSelector(
    (state: RootState) => state.seats.departure.selectedSeats,
  );

  const seats = Object.values(selectedCoaches);

  const priceForEachPassenger = (passengerIndex: number) => {
    const allSeats = seats.flat();

    if (passengerIndex >= allSeats.length) return "0";

    const price = allSeats[passengerIndex].price;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <>
      <AsideContainer>
        <h3 className={styles.aside__title}>Детали поездки</h3>
        <TripCollapsibleSection
          iconSrc="/icons/filter-to.svg"
          title="Туда"
          date={formatDateForDisplaying(date_start)}>
          <Direction train="departureTrain" />
        </TripCollapsibleSection>
        <TripCollapsibleSection
          iconSrc="/icons/filter-back.svg"
          title="Обратно"
          date={formatDateForDisplaying(date_start_arrival)}>
          {arrivalTrain && <Direction train="arrivalTrain" />}
        </TripCollapsibleSection>
        <TripCollapsibleSection title="Пассажиры" iconSrc="/icons/user.svg">
          <PassengerCollapsibleSection
            priceForEachPassenger={priceForEachPassenger}
          />
        </TripCollapsibleSection>
        <div className={styles.total_price}>
          <h4 className={styles.total_price_title}>Итого</h4>
          <Price
            amount={calculateTotalPrice(seats)}
            amountClassName={styles.total_price_value}
            iconClassName={styles.total_price_icon}
          />
        </div>
      </AsideContainer>
    </>
  );
}
