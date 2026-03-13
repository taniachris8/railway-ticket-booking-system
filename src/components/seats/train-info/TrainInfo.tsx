import { TicketLocation } from "../../tickets/ticket-location/TicketLocation";
import styles from "./TrainInfo.module.css";
import { ArrowRightIcon } from "../../../icons/ArrowRight";
import { ArrowLeftIcon } from "../../../icons/ArrowLeft";
import { Train } from "../../train/Train";
import { ClockIcon } from "../../../icons/Clock";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state/store";
import { formatCityName } from "../../../utils/formatCityName";
import { formatDuration, formatTime } from "../../../utils/formatTime";

export function TrainInfo({ direction }: { direction: "departure" | "arrival" }) {
  const departureTrain = useSelector(
    (state: RootState) => state.seats.departureTrain,
  );
  const arrivalTrain = useSelector(
    (state: RootState) => state.seats.arrivalTrain,
  );

  console.log("departureTrain in TrainInfo:", departureTrain);

  const train = direction === "departure" ? departureTrain : arrivalTrain;

  if (!train) return null;

  return (
    <div className={styles.train__info}>
      <div className={styles.train__info__item}>
        <Train
          name={departureTrain ? departureTrain.train.name : "Название поезда"}
          from_city={formatCityName(train.from.city.name)}
          to_city={formatCityName(train.to.city.name)}
          containerStyles={styles.train__item}
          iconStyles={styles.train__icon}
          trainDirectionsStyles={styles.train__directions}
        />
      </div>

      <div className={`${styles.train__info__item} ${styles.directions__item}`}>
        <TicketLocation
          city={formatCityName(train.from.city.name)}
          station={
            formatCityName(train.from.railway_station_name) + " вокзал"
          }
          containerClassName={styles.ticket_location}
          cityClassName={styles.city}
          stationClassName={styles.station}>
          <time className={styles.time}>
            {formatTime(train.from.datetime)}
          </time>
        </TicketLocation>
        {direction === "departure" && (
          <ArrowRightIcon className={styles.arrow__icon} />
        )}
        {direction === "arrival" && (
          <ArrowLeftIcon className={styles.arrow__icon} />
        )}
        <TicketLocation
          city={formatCityName(train.to.city.name)}
          station={
            formatCityName(train.to.railway_station_name) + " вокзал"
          }
          containerClassName={styles.ticket_location}
          cityClassName={styles.city}
          stationClassName={styles.station}>
          <time className={styles.time}>
            {formatTime(train.to.datetime)}
          </time>
        </TicketLocation>
      </div>

      <div className={`${styles.train__info__item} ${styles.duration__item}`}>
        <ClockIcon className={styles.clock__icon} />
        <time className={styles.duration}>
          {formatDuration(train.duration)}
        </time>
      </div>
    </div>
  );
}
