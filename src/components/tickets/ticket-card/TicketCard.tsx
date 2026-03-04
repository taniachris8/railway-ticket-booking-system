import styles from "./TicketCard.module.css";
import { ThinRightArrow } from "../../../icons/ThinRightArrow";
import { TicketLocation } from "../ticket-location/TicketLocation";
import { TicketSeats } from "../ticket-seats/TicketSeats";
import type { TicketType } from "../../../types";
import { formatCityName } from "../../../utils/formatCityName";
import { formatDuration } from "../../../utils/formatDuration";
import { formatTime } from "../../../utils/formatTime";
import { formatTrainName } from "../../../utils/formatTrainName";

export type TicketCardProps = {
  ticket: TicketType;
};

export function TicketCard({ ticket }: TicketCardProps) {
  const { arrival, departure } = ticket;

  return (
    <section className={ styles.ticket}>
      <div className={ styles.train}>
        <div className={ styles.train__img_wrapper}>
          <img
            src="/icons/train.svg"
            alt="train"
            className={ styles.train__img}
          />
        </div>
        <p className={ styles.train__number}>
          {formatTrainName(departure.train.name)}
        </p>
        <div className={ styles.train__direction}>
          {}
          <div className={ styles.train__stop}>
            <span className={ styles.train__city}>
              {formatCityName(departure.from.city.name)}
            </span>
            <ThinRightArrow className={ `${styles.train__direction_arrow} ${styles.inactive}`} />
          </div>
          <div className={ styles.train__stop}>
            <span className={ styles.train__city}>
              {formatCityName(departure.to.city.name)}
            </span>
            {/* <ThinRightArrow className="ticket__train-direction-arrow" /> */}
          </div>
          {/* <div className="ticket__train-stop">
            <span className="ticket__train-city">Санкт-Петербург</span>
          </div> */}
        </div>
      </div>

      <div className={ styles.details}>
        <div className={ styles.directions}>
          <div className={ styles.direction}>
            <TicketLocation
              containerClassName={ styles.departure}
              city={formatCityName(departure.from.city.name)}
              station={departure.from.railway_station_name + " вокзал"}
              cityClassName={ styles.city}
              stationClassName={ styles.station}>
              <time className={ styles.time}>
                {formatTime(departure.from.datetime)}
              </time>
            </TicketLocation>
            <div className={ styles.duration}>
              <p className={ styles.duration__text}>
                {formatDuration(departure.duration)}
              </p>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className={ styles.direction__arrow}
              />
            </div>
            <TicketLocation
              containerClassName={ styles.destination}
              city={formatCityName(departure.to.city.name)}
              station={departure.to.railway_station_name + " вокзал"}
              cityClassName={ styles.city}
              stationClassName={ styles.station}>
              <time className={ styles.time}>
                {formatTime(departure.to.datetime)}
              </time>
            </TicketLocation>
          </div>

          {arrival && (
            <>
              <div className={ styles.direction}>
                <TicketLocation
                  containerClassName={ styles.departure}
                  city={formatCityName(arrival.from.city.name)}
                  station={arrival.from.railway_station_name + " вокзал"}
                  cityClassName={ styles.city}
                  stationClassName={ styles.station}>
                  <time className={ styles.time}>
                    {formatTime(arrival.from.datetime)}
                  </time>
                </TicketLocation>
                <div className={ styles.duration}>
                  <p className={ styles.duration__text}>
                    {formatDuration(arrival.duration)}
                  </p>
                  <img
                    src="/icons/arrow-left.svg"
                    alt=""
                    className={ styles.direction__arrow}
                  />
                </div>
                <TicketLocation
                  containerClassName={ styles.destination}
                  city={formatCityName(arrival.to.city.name)}
                  station={arrival.to.railway_station_name + " вокзал"}
                  cityClassName={ styles.city}
                  stationClassName={ styles.station}>
                  <time className={ styles.time}>
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
