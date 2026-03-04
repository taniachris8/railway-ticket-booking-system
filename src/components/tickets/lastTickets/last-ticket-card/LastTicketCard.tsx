import styles from "./LastTicketCard.module.css";
import { Price } from "../../../price/Price";
import { TicketLocation } from "../../ticket-location/TicketLocation";
import type { DirectionType } from "../../../../types";
import { formatCityName } from "../../../../utils/formatCityName";
import { WifiIcon } from "../../../../icons/WifiIcon";
import { ExpressIcon } from "../../../../icons/ExpressIcon";
import { ACIcon } from "../../../../icons/ACIcon";

type LastTicketCardProps = {
  direction: DirectionType;
};

export function LastTicketCard({ direction }: LastTicketCardProps) {
  const { to, from } = direction.departure;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.directions}>
          <TicketLocation
            city={formatCityName(from.city.name)}
            station={`${from.railway_station_name}\nвокзал`}
            containerClassName={styles.departure}
            cityClassName={styles.city}
            stationClassName={styles.station}
          />
          <TicketLocation
            city={formatCityName(to.city.name)}
            station={`${to.railway_station_name}\nвокзал`}
            containerClassName={styles.destination}
            cityClassName={styles.city}
            stationClassName={styles.station}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.icons__wrapper}>
            {!direction.have_wifi && <WifiIcon className={styles.icon} />}
            {!direction.is_express && <ExpressIcon className={styles.icon} />}
            {!direction.have_air_conditioning && (
              <ACIcon className={styles.icon} />
            )}
          </div>
          <div className={styles.price__wrapper}>
            <p className={styles.price__text}>от</p>
            <Price
              amount={direction.min_price}
              amountClassName={styles.price__value}
              iconClassName={styles.price__icon}
            />
          </div>
        </div>
      </div>
    </>
  );
}
