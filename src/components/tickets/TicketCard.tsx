import "./TicketCard.css";
import { ThinRightArrow } from "../../icons/ThinRightArrow";
import { TicketLocation } from "./TicketLocation";
import { TicketSeats } from "./TicketSeats";

export function TicketCard() {
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
          <div className="ticket__direction">
            <TicketLocation
              containerClassName="ticket__direction-departure"
              city="Москва"
              station="Курский вокзал"
              cityClassName="ticket__direction-city"
              stationClassName="ticket__direction-station">
              <time className="ticket__direction-time">00:10</time>
            </TicketLocation>
            <div className="ticket__direction-duration">
              <p className="ticket__direction-duration-text">9:42</p>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="ticket__direction-arrow"
              />
            </div>
            <TicketLocation
              containerClassName="ticket__direction-destination"
              city="Санкт-Петербург"
              station="Ладожский вокзал"
              cityClassName="ticket__direction-city"
              stationClassName="ticket__direction-station">
              <time className="ticket__direction-time">09:52</time>
            </TicketLocation>
          </div>

          <div className="ticket__direction">
            <TicketLocation
              containerClassName="ticket__direction-departure"
              city="Москва"
              station="Курский вокзал"
              cityClassName="ticket__direction-city"
              stationClassName="ticket__direction-station">
              <time className="ticket__direction-time">00:10</time>
            </TicketLocation>
            <div className="ticket__direction-duration">
              <p className="ticket__direction-duration-text">9:42</p>
              <img
                src="/icons/arrow-left.svg"
                alt=""
                className="ticket__direction-arrow"
              />
            </div>
            <TicketLocation
              containerClassName="ticket__direction-destination"
              city="Санкт-Петербург"
              station="Ладожский вокзал"
              cityClassName="ticket__direction-city"
              stationClassName="ticket__direction-station">
              <time className="ticket__direction-time">09:52</time>
            </TicketLocation>
          </div>
        </div>
        <TicketSeats />
      </div>
    </section>
  );
}
