import "./AvailableSeatsTooltip.css";

export function AvailableSeatsTooltip() {
  return (
    <>
      <div className="seats">
        <div className="seats__upper">
          <p className="seats__type">верхние</p>
          <span className="seats__count">19</span>
          <div className="seats__price">
            <p className="seats__value">2 920</p>
            <img src="/icons/rub.svg" alt="рубль" className="seats__currency" />
          </div>
        </div>
        <div className="seats__lower">
          <p className="seats__type">нижние</p>
          <span className="seats__count">19</span>
          <div className="seats__price">
            <p className="seats__value">2 920</p>
            <img src="/icons/rub.svg" alt="рубль" className="seats__currency" />
          </div>
        </div>
      </div>
    </>
  );
}
