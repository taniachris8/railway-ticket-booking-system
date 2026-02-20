import "./LastTickets.css"
import { Price } from "../../price/Price";
import { TicketLocation } from "../TicketLocation";
import { FacilitiesIcon } from "../../../icons/Facilities";


export function LastTicketCard() {
  return (
    <>
      <div className="last-ticket">
        <div className="last-ticket__directions">
          <TicketLocation
            city="Санкт-Петербург"
            station={"Курский\nвокзал"}
            containerClassName="last-ticket__departure-location"
            cityClassName="last_tiket__direction-city"
            stationClassName="last_tiket__direction-station"
          />
          <TicketLocation
            city="Самара"
            station={`Московский
                вокзал`}
            containerClassName="last-ticket__destination-location"
            cityClassName="last_tiket__direction-city"
            stationClassName="last_tiket__direction-station"
          />
        </div>
        <div className="last-ticket__details">
          <FacilitiesIcon className="last-ticket__facilities" />
          <div className="last-ticket__price">
            <p className="last-ticket__price-text">от</p>
            <Price
              amount="2 500"
              amountClassName="last-ticket__price-value"
              iconClassName="last-tiket__price-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}
