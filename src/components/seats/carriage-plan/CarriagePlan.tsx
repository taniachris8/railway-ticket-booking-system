import styles from "./CarriagePlan.module.css";
import type { SeatsInfoType } from "../../../types";
import { ThirdClassCarriagePlan } from "../carriage-plans/ThirdClassCarriagePlan";
import { FirstClassCarriagePlan } from "../carriage-plans/FirstClassCarriagePlan";
import { FourthClassCarriagePlan } from "../carriage-plans/FourthClassCarriagePlan";
import { SecondClassCarriagePlan } from "../carriage-plans/SecondClassCarriagePlan";
import type { RootState } from "../../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleSeat } from "../../../state/reducers/seatsSlice";
import { Module } from "../../module/Module";
import { useState, useEffect } from "react";
import { Price } from "../../price/Price";
import { setSeatsField } from "../../../state/reducers/seatsSlice";
import { formatCarriageName } from "../../../utils/formatCarriageName";

type CarriagePlanProps = {
  data: SeatsInfoType;
  direction: "departure" | "arrival";
};

export function CarriagePlan({ data, direction }: CarriagePlanProps) {
  const { class_type, price, top_price, bottom_price, side_price, _id, name } =
    data.coach;
  const carriageNumber = formatCarriageName(name);
  const dispatch = useDispatch();
  const { adultCount, childCount } = useSelector(
    (state: RootState) => state.seats[direction],
  );
  const selectedSeats = useSelector(
    (state: RootState) => state.seats[direction].selectedSeats,
  );

  const carriagePrices = useSelector(
    (state: RootState) => state.seats[direction].carriagePrices,
  );

  console.log("carriagePrices", carriagePrices);

  const [showWarningModule, setShowWarningModule] = useState(false);
  const [showMaxSeatsModule, setShowMaxSeatsModule] = useState(false);

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

  const carriageState = useSelector(
    (state: RootState) => state.seats[direction],
  );

  const handleSelectSeat = (seatNumber: number) => {
    if (adultCount === 0) {
      setShowWarningModule(true);
      return;
    }

    if (!isSeatAvailable(seatNumber)) {
      return;
    }

    const isSelected = selected.includes(seatNumber);
    if (!isSelected && totalSelected >= maxSeats) {
      setShowMaxSeatsModule(true);
      return;
    }

    dispatch(toggleSeat({ direction, carriageId: _id, seatNumber }));
  };

  useEffect(() => {
    const seatsInCarriage = selectedSeats[_id] ?? [];
    const totalForCarriage = seatsInCarriage.reduce(
      (sum, seatNumber) => sum + getSeatPrice(seatNumber),
      0,
    );

    const newCarriagePrices = {
      ...carriageState.carriagePrices,
      [_id]: totalForCarriage,
    };

    const newTotalPrice = Object.values(newCarriagePrices).reduce(
      (sum, price) => sum + price,
      0,
    );

    dispatch(
      setSeatsField({
        key: direction,
        value: {
          ...carriageState,
          carriagePrices: newCarriagePrices,
          totalPrice: newTotalPrice,
        },
      }),
    );
  }, [selectedSeats[_id], dispatch]);

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
      {showWarningModule && (
        <Module
          message="Пожалуйста, добавьте хотя бы одного взрослого пассажира"
          type="info"
          onClick={() => setShowWarningModule(false)}
        />
      )}
      {showMaxSeatsModule && (
        <Module
          message={`Вы можете выбрать не более ${maxSeats} мест. Пожалуйста, увеличьте количество билетов, чтобы выбрать больше мест.`}
          type="info"
          onClick={() => setShowMaxSeatsModule(false)}
        />
      )}
      {
        <div className={styles.price__container}>
          <Price
            amount={carriagePrices[_id] || 0}
            amountClassName={styles.amount}
            iconClassName={styles.currency}
          />
        </div>
      }
    </div>
  );
}
