import "./TicketCard.css"
import { useState } from "react";
import { AvailableSeatsTooltip } from "./AvailableSeatsTooltip";
import { Price } from "../price/Price";
import { Button } from "../buttons/Button";
import { FacilitiesIcon } from "../../icons/Facilities";

export function TicketSeats() {
  const [showAvailableSeats, setShowAvailableSeats] = useState(false);
  return (
    <>
      <div className="ticket__seats">
        <ul className="ticket__seats-list">
          <li className="ticket__seats-item">
            <p className="ticket__seat-type">Сидячий</p>
            <p
              onMouseEnter={() => setShowAvailableSeats(true)}
              onMouseLeave={() => setShowAvailableSeats(false)}
              className="ticket__seat-count">
              88
              {showAvailableSeats && <AvailableSeatsTooltip />}
            </p>

            <div className="ticket__seat-price">
              <span className="ticket__seat-price-label"> от</span>
              <Price
                amount="1 920"
                amountClassName="ticket__seat-price-value"
                iconClassName="ticket__seat-price-currency"
              />
            </div>
          </li>
          <li className="ticket__seats-item">
            <p className="ticket__seat-type">Плацкарт</p>
            <p className="ticket__seat-count">52</p>

            <div className="ticket__seat-price">
              <span className="ticket__seat-price-label"> от</span>
              <Price
                amount="2 530"
                amountClassName="ticket__seat-price-value"
                iconClassName="ticket__seat-price-currency"
              />
            </div>
          </li>
          <li className="ticket__seats-item">
            <p className="ticket__seat-type">Купе</p>
            <p className="ticket__seat-count">24</p>

            <div className="ticket__seat-price">
              <span className="ticket__seat-price-label"> от</span>
              <Price
                amount="3 850"
                amountClassName="ticket__seat-price-value"
                iconClassName="ticket__seat-price-currency"
              />
            </div>
          </li>
        </ul>
        <FacilitiesIcon className="ticket__seats-facilities" />
        <Button variant="choose" text="Выбрать места" />
      </div>
    </>
  );
}
