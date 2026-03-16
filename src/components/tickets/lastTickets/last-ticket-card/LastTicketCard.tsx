import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import type { DirectionType } from "../../../../types";

import { setSeatsFiltersField } from "../../../../state/reducers/filterSeatsSlice";
import { setSeatsField } from "../../../../state/reducers/seatsSlice";
import { resetSearchStateAction } from "../../../../state/actions/resetSearch";

import { formatCityName } from "../../../../utils/formatCityName";

import { Price } from "../../../price/Price";
import { TicketLocation } from "../../ticket-location/TicketLocation";

import { WifiIcon } from "../../../../icons/WifiIcon";
import { ExpressIcon } from "../../../../icons/ExpressIcon";
import { ACIcon } from "../../../../icons/ACIcon";

import styles from "./LastTicketCard.module.css";

type LastTicketCardProps = {
  direction: DirectionType;
};

export function LastTicketCard({ direction }: LastTicketCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { to, from } = direction.departure;

  const navigateToSeatsPage = () => {
    dispatch(resetSearchStateAction());
    dispatch(
      setSeatsFiltersField({ key: "id", value: direction.departure._id }),
    );
    dispatch(
      setSeatsField({ key: "departureTrain", value: direction.departure }),
    );
    
    if (location.pathname === "/seats") {
        const seatsContentEl = document.getElementById("seats-content");
        if (seatsContentEl) {
          seatsContentEl.scrollIntoView({ behavior: "smooth" });
        }
     } else {
       navigate("/seats");
     }
  };

  return (
    <>
      <div className={styles.container} onClick={navigateToSeatsPage}>
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
            {direction.have_wifi && <WifiIcon className={styles.icon} />}
            {direction.is_express && <ExpressIcon className={styles.icon} />}
            {direction.have_air_conditioning && (
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
