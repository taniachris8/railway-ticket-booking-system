import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import type { SeatsInfoType } from "../../../types";
import type { RootState } from "../../../state/store";

import { selectSelectedSeats } from "../../../state/selectors/seatSelectors";
import { toggleSeat } from "../../../state/reducers/seatsSlice";

import { formatCarriageName } from "../../../utils/formatCarriageName";

import { Modal } from "../../modal/Modal";
import { FirstClassCarriagePlan } from "../carriage-plans/first-class-carriage-plan/FirstClassCarriagePlan";
import { SecondClassCarriagePlan } from "../carriage-plans/second-class-carriage-plan/SecondClassCarriagePlan";
import { ThirdClassCarriagePlan } from "../carriage-plans/third-class-carriage-plan/ThirdClassCarriagePlan";
import { FourthClassCarriagePlan } from "../carriage-plans/fourth-class-carriage-plan/FourthClassCarriagePlan";
import { Price } from "../../price/Price";

import styles from "./CarriagePlan.module.css";

type CarriagePlanProps = {
  data: SeatsInfoType;
  direction: "departure" | "arrival";
};

export function CarriagePlan({ data, direction }: CarriagePlanProps) {
  const { class_type, price, top_price, bottom_price, side_price, _id, name } =
    data.coach;
  const carriageNumber = formatCarriageName(name);
  const dispatch = useDispatch();
  const { adultCount, childCount, wifiPrice, linenPrice } = useSelector(
    (state: RootState) => state.seats[direction],
  );
  const selectedSeats = useSelector((state: RootState) =>
    selectSelectedSeats(state, direction),
  );

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showMaxSeatsModal, setShowMaxSeatsModal] = useState(false);

  const maxSeats = adultCount + childCount;
  const totalSelected = Object.values(selectedSeats).flat().length;
  const selected = selectedSeats[_id] ?? [];

  const availableSeatIndexes = new Set(
    data.seats.filter((seat) => seat.available).map((seat) => seat.index),
  );

  const isSeatAvailable = (seatNumber: number) => {
    return availableSeatIndexes.has(seatNumber);
  };

  const getSeatPrice = (seatNumber: number) => {
    if (price > 0) return price;

    switch (class_type) {
      case "second":
        return seatNumber % 2 === 0 ? top_price : bottom_price;
      case "third":
        if (seatNumber % 2 === 0) return top_price;
        else if (seatNumber >= 33 && seatNumber <= 48) return side_price;
        else return bottom_price;
      case "first":
      case "fourth":
        return price;
      default:
        return 0;
    }
  };

  const handleSelectSeat = (seatNumber: number) => {
    if (adultCount === 0) {
      setShowWarningModal(true);
      return;
    }

    if (!isSeatAvailable(seatNumber)) {
      return;
    }

    const isSelected = selected.includes(seatNumber);
    if (!isSelected && totalSelected >= maxSeats) {
      setShowMaxSeatsModal(true);
      return;
    }

    dispatch(toggleSeat({ direction, carriageId: _id, seatNumber }));
  };

  const seatsInCarriage = selectedSeats[_id] ?? [];
  const totalPassengers = adultCount + childCount;
  const optionPrice = ((wifiPrice ?? 0) + (linenPrice ?? 0)) * totalPassengers;

  const carriagePrice = seatsInCarriage.reduce(
    (sum, seatNumber) => sum + getSeatPrice(seatNumber) + optionPrice,
    0,
  );

  return (
    <div className={styles.carriage__plan}>
      {class_type === "first" && (
        <FirstClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
          carriageNumber={carriageNumber}
        />
      )}
      {class_type === "second" && (
        <SecondClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
          carriageNumber={carriageNumber}
        />
      )}
      {class_type === "third" && (
        <ThirdClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
          carriageNumber={carriageNumber}
        />
      )}
      {class_type === "fourth" && (
        <FourthClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
          carriageNumber={carriageNumber}
        />
      )}
      <div className={styles.clients__online}>
        11 человек выбирают места в этом поезде
      </div>
      {showWarningModal && (
        <Modal
          message="Пожалуйста, добавьте хотя бы одного взрослого пассажира"
          type="info"
          onClick={() => setShowWarningModal(false)}
        />
      )}
      {showMaxSeatsModal && (
        <Modal
          message={`Вы можете выбрать не более ${maxSeats} мест. Пожалуйста, увеличьте количество билетов, чтобы выбрать больше мест.`}
          type="info"
          onClick={() => setShowMaxSeatsModal(false)}
        />
      )}
      {
        <div className={styles.price__container}>
          <Price
            amount={carriagePrice}
            amountClassName={styles.amount}
            iconClassName={styles.currency}
          />
        </div>
      }
    </div>
  );
}
