import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../state/store";
import type { AvailableSeatsInfoType, TicketType } from "../../../types";

import { setSeatsFiltersField } from "../../../state/reducers/filterSeatsSlice";
import { setSeatsField } from "../../../state/reducers/seatsSlice";

import { AvailableSeatsTooltip } from "../available-seats-tooltip/AvailableSeatsTooltip";
import { Price } from "../../price/Price";
import { Button } from "../../button/Button";

import { WifiIcon } from "../../../icons/WifiIcon";
import { ExpressIcon } from "../../../icons/ExpressIcon";
import { ACIcon } from "../../../icons/ACIcon";

import styles from "./TicketSeats.module.css";

type TicketSeatsProps = {
  ticket: TicketType;
};

export function TicketSeats({ ticket }: TicketSeatsProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAvailableSeats, setShowAvailableSeats] = useState<string | null>(
    null,
  );
  const { departure, arrival } = ticket;
  const { have_air_conditioning, have_wifi, is_express } = ticket;

  const findMinPrice = (obj: Record<string, number>): number => {
    const prices = Object.values(obj);
    const min = Math.min(...prices);
    return min;
  };

  const navigateToSeatsPage = () => { 
    dispatch(setSeatsFiltersField({ key: "id", value: departure._id }));
    dispatch(setSeatsField({ key: "departureTrain", value: departure }));
    dispatch(setSeatsField({ key: "arrivalTrain", value: arrival }));
  
    navigate("/seats");
  }

  return (
    <>
      <div className={ styles.seats}>
        <ul className={ styles.seats__list}>
          {Object.entries(departure.price_info).map(([key, prices]) => {
            const typedKey = key as keyof AvailableSeatsInfoType;
            const seatCount = departure.available_seats_info[typedKey];
            const seatPrices = departure.price_info[typedKey];
            if (!seatCount) return null;
            if (!seatCount || !seatPrices) return null;

            const seatLabels: Record<string, string> = {
              first: "СВ",
              second: "Купе",
              third: "Плацкарт",
              fourth: "Сидячий",
            };
            const label = seatLabels[key] || key;

            return (
              <li key={key} className={ styles.seats__item}>
                <p className={ styles.seat__type}>{label}</p>
                <div
                  onMouseEnter={() => setShowAvailableSeats(key)}
                  onMouseLeave={() => setShowAvailableSeats(null)}
                  className={ styles.seat__count}>
                  {seatCount}
                  {showAvailableSeats === key && (
                    <AvailableSeatsTooltip availableSeats={seatPrices} />
                  )}
                </div>

                <div className={ styles.seat__price}>
                  <span className={ styles.seat__price_label}> от</span>
                  <Price
                    amount={findMinPrice(prices)}
                    amountClassName={ styles.seat__price_value}
                    iconClassName={ styles.seat__price_currency}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={ styles.seats__lower_wrapper}>
          <div className={ styles.seats__icons_wrapper}>
            {have_wifi && <WifiIcon className={ styles.seats__icon} />}
            {is_express && <ExpressIcon className={ styles.seats__icon} />}
            {have_air_conditioning && (
              <ACIcon className={ styles.seats__icon} />
            )}
          </div>
          <Button variant="choose" text="Выбрать места" onClick={navigateToSeatsPage}/>
        </div>
      </div>
    </>
  );
}
