import "./DirectionInputs.css"
import { DepartureInput } from "./DepartureInput";
import { DestinationInput } from "./DestinationInput";

export function DirectionInputs() {
  return (
    <>
      <div className="direction">
        <label htmlFor="">Направление</label>
        <div className="direction__inputs">
          <DepartureInput
            containerClassName="direction__input direction__input--from"
            inputClassName="direction__input-field"
            iconClassName="direction__icon"
          />
          <img
            src="/icons/ic_cached_white_48dp.png"
            alt=""
            className="direction__switcher"
          />
          <DestinationInput
            containerClassName="direction__input direction__input--to"
            inputClassName="direction__input-field"
            iconClassName="direction__icon"
          />
        </div>
      </div>
    </>
  );
}
