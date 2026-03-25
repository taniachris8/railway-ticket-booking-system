import { useSelector } from "react-redux";

import { AsideContainer } from "../../aside-container/AsideContainer";
import { TripCollapsibleSection } from "../../trip-collapsible-section/TripCollapsibleSection";

import styles from "./AsideWidget.module.css";
import type { RootState } from "../../../state/store";
import { formatDateForDisplaying } from "../../../utils/formatDateForDisplaying";
import { PassengerCollapsibleSection } from "../passengers-collapsible-section/PassengerCollapsibleSection";
import { Price } from "../../price/Price";
import { Direction } from "../../direction/Direction";

export function AsideWidget() {
  const arrivalTrain = useSelector(
    (state: RootState) => state.seats.arrivalTrain,
  );

  const { date_start, date_start_arrival } = useSelector(
    (state: RootState) => state.filters,
  );

  const { departure, arrival } = useSelector((state: RootState) => state.seats);
  console.log("departure and arrival from AsideWidget:", departure, arrival);

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
          <PassengerCollapsibleSection />
        </TripCollapsibleSection>
        <div className={styles.total_price}>
          <h4 className={styles.total_price_title}>Итого</h4>
          <Price
            amount={7760}
            amountClassName={styles.total_price_value}
            iconClassName={styles.total_price_icon}
          />
        </div>
      </AsideContainer>
    </>
  );
}
