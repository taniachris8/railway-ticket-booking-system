import { TicketLocation } from "../../tickets/ticket-location/TicketLocation";
import styles from "./TrainInfo.module.css";
import { ArrowRightIcon } from "../../../icons/ArrowRight";
import { ArrowLeftIcon } from "../../../icons/ArrowLeft";
import { Train } from "../../train/Train";
import { ClockIcon } from "../../../icons/Clock";

export function TrainInfo({ direction }: { direction: string }) {

  return (
    <div className={styles.train__info}>
      <div className={styles.train__info__item}>
        <Train
          name="jhsdhfj"
          from_city="jsdhfvj"
          to_city="sdjhfvjse"
          containerStyles={styles.train__item}
          iconStyles={styles.train__icon}
        />
      </div>

      <div className={`${styles.train__info__item} ${styles.directions__item}`}>
        <TicketLocation
          city="Москва"
          station="Казанский вокзал"
          containerClassName={styles.ticket_location}
          cityClassName={styles.city}
          stationClassName={styles.station}>
          <time className={styles.time}>00:10</time>
        </TicketLocation>
        {direction === "to" && (
          <ArrowRightIcon className={styles.arrow__icon} />
        )}
        {direction === "from" && (
          <ArrowLeftIcon className={styles.arrow__icon} />
        )}
        <TicketLocation
          city="Санкт-Петербург"
          station="Ладожский вокзал"
          containerClassName={styles.ticket_location}
          cityClassName={styles.city}
          stationClassName={styles.station}>
          <time className={styles.time}>09:52</time>
        </TicketLocation>
      </div>

      <div className={`${styles.train__info__item} ${styles.duration__item}`}>
        <ClockIcon className={styles.clock__icon} />
        <time className={styles.duration}>
          9 часов
          <br /> 42 минуты
        </time>
      </div>
    </div>
  );
}
