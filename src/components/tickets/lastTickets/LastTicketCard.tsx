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
            locationClassName="last-ticket__departure-location"
            multiline
          />
          <TicketLocation
            city="Самара"
            station={`Московский
                вокзал`}
            locationClassName="last-ticket__destination-location"
            multiline
          />
        </div>
        <div className="last-ticket__details">
          <FacilitiesIcon className="last-ticket__facilities" />
          <div className="last-ticket__price">
            <p className="last-ticket__price-text">от</p>
            <Price
              amount={"2 500"}
              amountClassName="last-ticket__price-value"
            />
          </div>
        </div>
      </div>
    </>
  );
}
