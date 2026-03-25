import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";

import { formatTrainName } from "../../utils/formatTrainName";
import { formatCityName } from "../../utils/formatCityName";
import { formatTime } from "../../utils/formatTime";
import { formatDateForDisplaying } from "../../utils/formatDateForDisplaying";
import { formatDuration } from "../../utils/formatDuration";

import { TicketLocation } from "../tickets/ticket-location/TicketLocation";
import styles from "./Direction.module.css";

type DirectionProps = {
  train: "departureTrain" | "arrivalTrain";
};

export function Direction({ train }: DirectionProps) {
  const direction = useSelector((state: RootState) => state.seats[train]);

  const { date_start, date_end, date_start_arrival, date_end_arrival } =
    useSelector((state: RootState) => state.filters);

  if (!direction) {
    return null;
  }

  return (
    <>
      <div className={styles.aside_widget_direction}>
        <div className={styles.train_info}>
          <div className={styles.train_info__item}>
            <span className={styles.train_info__label}>№ Поезда</span>
            <span className={styles.train_info__value_number}>
              {formatTrainName(direction.train.name)}
            </span>
          </div>
          <div className={styles.train_info__item}>
            <span className={styles.train_info__label}>Название</span>
            <span className={styles.train_info__value_cities}>
              {formatCityName(direction.from.city.name)}
              <br />
              {formatCityName(direction.to.city.name)}
            </span>
          </div>
        </div>
        <div className={styles.direction}>
          <TicketLocation
            containerClassName={styles.departure}
            city={formatCityName(direction.from.city.name)}
            station={`${direction.from.railway_station_name}\nвокзал`}
            cityClassName={styles.city}
            stationClassName={styles.station}>
            <time className={styles.time}>
              {formatTime(direction.from.datetime)}
            </time>
            <time className={styles.date}>
              {train === "departureTrain"
                ? date_start && formatDateForDisplaying(date_start)
                : date_start_arrival && formatDateForDisplaying(date_start_arrival)}
            </time>
          </TicketLocation>
          <div className={styles.duration}>
            <p className={styles.duration__text}>
              {formatDuration(direction.duration)}
            </p>
            <img
              src={
                train === "departureTrain"
                  ? "/icons/arrow-left.svg"
                  : "/icons/arrow-right.svg"
              }
              alt=""
              className={styles.direction__arrow}
            />
          </div>
          <TicketLocation
            containerClassName={styles.destination}
            city={formatCityName(direction.to.city.name)}
            station={`${direction.to.railway_station_name}\nвокзал`}
            cityClassName={styles.city}
            stationClassName={styles.station}>
            <time className={styles.time}>
              {formatTime(direction.to.datetime)}
            </time>
            <time className={styles.date}>
              {train === "departureTrain"
                ? date_end && formatDateForDisplaying(date_end)
                : date_end_arrival && formatDateForDisplaying(date_end_arrival)}
            </time>
          </TicketLocation>
        </div>
      </div>
    </>
  );
}
