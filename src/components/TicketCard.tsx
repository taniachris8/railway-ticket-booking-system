import { useState } from "react";
import { Button } from "./button/Button";
import { AvailableSeats } from "./AvailableSeats";

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
            <svg
              className="ticket__train-direction-arrow"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3536 4.03553C13.5488 3.84027 13.5488 3.52369 13.3536 3.32842L10.1716 0.146442C9.97631 -0.0488198 9.65973 -0.0488198 9.46447 0.146442C9.2692 0.341705 9.2692 0.658287 9.46447 0.853549L12.2929 3.68198L9.46447 6.5104C9.2692 6.70567 9.2692 7.02225 9.46447 7.21751C9.65973 7.41277 9.97631 7.41277 10.1716 7.21751L13.3536 4.03553ZM0 4.18198H13V3.18198H0V4.18198Z"
                fill="#928F94"
              />
            </svg>
          </div>

          <div className="ticket__train-stop">
            <span className="ticket__train-city">Москва</span>
            <svg
              className="ticket__train-direction-arrow"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3536 4.03553C13.5488 3.84027 13.5488 3.52369 13.3536 3.32842L10.1716 0.146442C9.97631 -0.0488198 9.65973 -0.0488198 9.46447 0.146442C9.2692 0.341705 9.2692 0.658287 9.46447 0.853549L12.2929 3.68198L9.46447 6.5104C9.2692 6.70567 9.2692 7.02225 9.46447 7.21751C9.65973 7.41277 9.97631 7.41277 10.1716 7.21751L13.3536 4.03553ZM0 4.18198H13V3.18198H0V4.18198Z"
                fill="#292929"
              />
            </svg>
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
                {showAvailableSeats && <AvailableSeats />}
              </p>

              <div className="ticket__seat-price">
                <span className="ticket__seat-price-label"> от</span>
                <p className="ticket__seat-price-value">1 920</p>
                <img
                  src="/icons/rub.svg"
                  alt="рубль"
                  className="ticket__seat-price-currency"
                />
              </div>
            </li>
            <li className="ticket__seats-item">
              <p className="ticket__seat-type">Плацкарт</p>
              <p className="ticket__seat-count">52</p>

              <div className="ticket__seat-price">
                <span className="ticket__seat-price-label"> от</span>
                <p className="ticket__seat-price-value">2 530</p>
                <img
                  src="/icons/rub.svg"
                  alt="рубль"
                  className="ticket__seat-price-currency"
                />
              </div>
            </li>
            <li className="ticket__seats-item">
              <p className="ticket__seat-type">Купе</p>
              <p className="ticket__seat-count">24</p>

              <div className="ticket__seat-price">
                <span className="ticket__seat-price-label"> от</span>
                <p className="ticket__seat-price-value">3 850</p>
                <img
                  src="/icons/rub.svg"
                  alt="рубль"
                  className="ticket__seat-price-currency"
                />
              </div>
            </li>
          </ul>

          <div className="ticket__seats-icons">
            <img
              src="/icons/facilities.png"
              alt="facilities"
              className="ticket__seats-facilities"
            />
          </div>
          <Button variant="choose" text="Выбрать места" />
        </div>
      </div>
    </section>
  );
}
