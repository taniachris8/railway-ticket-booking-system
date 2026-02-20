import "./TicketCard.css";
import { useState } from "react";
import { Button } from "../buttons/Button";
import { AvailableSeatsTooltip } from "./AvailableSeatsTooltip";
import { FacilitiesIcon } from "../../icons/Facilities";
import { Price } from "../price/Price";
import { ThinRightArrow } from "../../icons/ThinRightArrow";

export function TicketCard() {
  const [showAvailableSeats, setShowAvailableSeats] = useState(false);

  return (
    <section className="ticket">
      <div className="ticket__train">
        <div className="ticket__train-img-wrapper">
          <img
            src="/icons/train.svg"
            alt="train"
            className="ticket__train-img"
          />
        </div>

        <p className="ticket__train-number">116С</p>

        <div className="ticket__train-direction">
          <div className="ticket__train-stop">
            <span className="ticket__train-city inactive">Адлер</span>
            <ThinRightArrow className="ticket__train-direction-arrow inactive" />
          </div>

          <div className="ticket__train-stop">
            <span className="ticket__train-city">Москва</span>
            <ThinRightArrow className="ticket__train-direction-arrow" />
          </div>

          <div className="ticket__train-stop">
            <span className="ticket__train-city">Санкт-Петербург</span>
          </div>
        </div>
      </div>
      <div className="ticket__details">
        <div className="ticket__directions">
          <div className="ticket__direction ticket__direction--to">
            <div className="ticket__direction-from">
              <time className="ticket__direction-time">00:10</time>
              <p className="ticket__direction-city">Москва</p>
              <p className="ticket__direction-station">Курский вокзал</p>
            </div>
            <div className="ticket__direction-duration">
              <p className="ticket__direction-duration-text">9:42</p>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="ticket__direction-arrow"
              />
            </div>
            <div className="ticket__direction-to">
              <time className="ticket__direction-time">00:10</time>
              <p className="ticket__direction-city">Москва</p>
              <p className="ticket__direction-station">Курский вокзал</p>
            </div>
          </div>

          <div className="ticket__direction ticket__direction--back">
            <div className="ticket__direction-from">
              <time className="ticket__direction-time">00:10</time>
              <p className="ticket__direction-city">Москва</p>
              <p className="ticket__direction-station">Курский вокзал</p>
            </div>
            <div className="ticket__direction-duration">
              <p className="ticket__direction-duration-text">9:42</p>
              <img
                src="/icons/arrow-left.svg"
                alt=""
                className="ticket__direction-arrow"
              />
            </div>
            <div className="ticket__direction-to">
              <time className="ticket__direction-time">00:10</time>
              <p className="ticket__direction-city">Москва</p>
              <p className="ticket__direction-station">Курский вокзал</p>
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
}
