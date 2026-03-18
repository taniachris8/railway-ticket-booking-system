import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { SeatsInfoType, TicketType } from "../../../types";

import { getAvailableSeats } from "../../../api/api";

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

type PriceGroup = {
  top_price: number;
  bottom_price: number;
  side_price: number;
};

export function TicketSeats({ ticket }: TicketSeatsProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { departure, arrival } = ticket;
  const { have_air_conditioning, have_wifi, is_express } = ticket;
  const [showAvailableSeats, setShowAvailableSeats] = useState<string | null>(
    null,
  );
  const [carriages, setCarriages] = useState<SeatsInfoType[] | null>(null);

  const groupedCarriages = useMemo(() => {
    if (!carriages) return [];

    const map = new Map();

    for (const carriage of carriages) {
      const type = carriage.coach.class_type;

      if (!map.has(type)) {
        map.set(type, {
          class_type: type,
          carriages: [],
          totalCount: 0,
          prices: [],
        });
      }

      const group = map.get(type);

      const availableSeats = carriage.seats.filter((s) => s.available).length;

      group.carriages.push(carriage);
      group.totalCount += availableSeats;

      group.prices.push({
        top_price: Number(carriage.coach.top_price) || 0,
        bottom_price: Number(carriage.coach.bottom_price) || 0,
        side_price: Number(carriage.coach.side_price) || 0,
      });
    }

    return Array.from(map.values());
  }, [carriages]);

  const getMinPriceFromGroup = (pricesArray: PriceGroup[]) : number => {
    const allPrices = pricesArray.flatMap((p) => Object.values(p));
    const filtered = allPrices.filter((p) => p > 0);
    return filtered.length ? Math.min(...filtered) : 0;
  };

  const navigateToSeatsPage = () => {
    dispatch(setSeatsFiltersField({ key: "id", value: departure._id }));
    if (arrival) {
      dispatch(setSeatsFiltersField({ key: "id", value: arrival._id }));
    }
    dispatch(setSeatsField({ key: "departureTrain", value: departure }));
    dispatch(setSeatsField({ key: "arrivalTrain", value: arrival }));
    navigate("/seats");
  };

  const getAvailableSeatsCount = async () => {
    try {
      const data = await getAvailableSeats(departure._id);
      setCarriages(data);
    } catch (error) {
      console.error("Ошибка при получении мест:", error);
    }
  };

  useEffect(() => {
    getAvailableSeatsCount();
  }, []);

  const handleOnMouseEnter = (key: string) => {
    if (!departure._id) return;
    setShowAvailableSeats(key);
  };

  const handleOnMouseLeave = () => {
    setShowAvailableSeats(null);
  };

  return (
    <>
      <div className={styles.seats}>
        <ul className={styles.seats__list}>
          {groupedCarriages.map((group) => {
            const seatLabels: Record<string, string> = {
              first: "СВ",
              second: "Купе",
              third: "Плацкарт",
              fourth: "Сидячий",
            };

            const label = seatLabels[group.class_type] || group.class_type;

            const eligibleForTooltip =
              group.class_type === "second" || group.class_type === "third";

            const minPrice = getMinPriceFromGroup(group.prices);

            return (
              <li key={group.class_type} className={styles.seats__item}>
                <p className={styles.seat__type}>{label}</p>

                <div
                  onMouseEnter={() => handleOnMouseEnter(group.class_type)}
                  onMouseLeave={handleOnMouseLeave}
                  className={styles.seat__count}>
                  {group.totalCount}

                  {showAvailableSeats === group.class_type &&
                    eligibleForTooltip && (
                      <AvailableSeatsTooltip
                        carriages={group.carriages}
                        class_type={group.class_type}
                      />
                    )}
                </div>

                <div className={styles.seat__price}>
                  <span className={styles.seat__price_label}> от</span>
                  <Price
                    amount={minPrice}
                    amountClassName={styles.seat__price_value}
                    iconClassName={styles.seat__price_currency}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.seats__lower_wrapper}>
          <div className={styles.seats__icons_wrapper}>
            {have_wifi && <WifiIcon className={styles.seats__icon} />}
            {is_express && <ExpressIcon className={styles.seats__icon} />}
            {have_air_conditioning && <ACIcon className={styles.seats__icon} />}
          </div>
          <Button
            variant="choose"
            text="Выбрать места"
            onClick={navigateToSeatsPage}
          />
        </div>
      </div>
    </>
  );
}
