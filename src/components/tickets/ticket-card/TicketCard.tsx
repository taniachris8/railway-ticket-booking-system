import type { TicketType } from "../../../types";

import { formatCityName } from "../../../utils/formatCityName";
import { formatDuration } from "../../../utils/formatDuration";
import { formatTime } from "../../../utils/formatTime";
import { getPublicAssetPath } from "../../../utils/getPublicAssetPath";

import { TicketLocation } from "../ticket-location/TicketLocation";
import { TicketSeats } from "../ticket-seats/TicketSeats";
import { Train } from "../../train/Train";

import styles from "./TicketCard.module.css";

export type TicketCardProps = {
  ticket: TicketType;
};

export function TicketCard({ ticket }: TicketCardProps) {
  const { arrival, departure } = ticket;

  return (
    <section className={styles.ticket}>
      <Train
        name={departure.train.name}
        from_city={departure.from.city.name}
        to_city={departure.to.city.name}
        containerStyles={styles.train__item}
        iconStyles={styles.train__icon}
      />

      <div className={styles.details}>
        <div className={styles.directions}>
          <div className={styles.direction}>
            <TicketLocation
              containerClassName={styles.departure}
              city={formatCityName(departure.from.city.name)}
              station={departure.from.railway_station_name + " вокзал"}
              cityClassName={styles.city}
              stationClassName={styles.station}>
              <time className={styles.time}>
                {formatTime(departure.from.datetime)}
              </time>
            </TicketLocation>
            <div className={styles.duration}>
              <p className={styles.duration__text}>
                {formatDuration(departure.duration)}
              </p>
              <img
                src={getPublicAssetPath("/icons/arrow-right.svg")}
                alt=""
                className={styles.direction__arrow}
              />
            </div>
            <TicketLocation
              containerClassName={styles.destination}
              city={formatCityName(departure.to.city.name)}
              station={departure.to.railway_station_name + " вокзал"}
              cityClassName={styles.city}
              stationClassName={styles.station}>
              <time className={styles.time}>
                {formatTime(departure.to.datetime)}
              </time>
            </TicketLocation>
          </div>

          {arrival && (
            <>
              <div className={styles.direction}>
                <TicketLocation
                  containerClassName={styles.departure}
                  city={formatCityName(arrival.from.city.name)}
                  station={arrival.from.railway_station_name + " вокзал"}
                  cityClassName={styles.city}
                  stationClassName={styles.station}>
                  <time className={styles.time}>
                    {formatTime(arrival.from.datetime)}
                  </time>
                </TicketLocation>
                <div className={styles.duration}>
                  <p className={styles.duration__text}>
                    {formatDuration(arrival.duration)}
                  </p>
                  <img
                    src={getPublicAssetPath("/icons/arrow-left.svg")}
                    alt=""
                    className={styles.direction__arrow}
                  />
                </div>
                <TicketLocation
                  containerClassName={styles.destination}
                  city={formatCityName(arrival.to.city.name)}
                  station={arrival.to.railway_station_name + " вокзал"}
                  cityClassName={styles.city}
                  stationClassName={styles.station}>
                  <time className={styles.time}>
                    {formatTime(arrival.to.datetime)}
                  </time>
                </TicketLocation>
              </div>
            </>
          )}
        </div>
        <TicketSeats ticket={ticket} />
      </div>
    </section>
  );
}
