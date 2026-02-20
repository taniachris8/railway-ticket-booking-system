import "./DateInputs.css"
import { DepartureDateInput } from "./DepartureDateInput";
import { ReturnDateInput } from "./ReturnDateInput";

export function DateInputs() {
  return (
    <>
      <div className="date">
        <label htmlFor="">Дата</label>
        <div className="date__inputs">
          <DepartureDateInput inputClassName="date__departure__input" />
          <ReturnDateInput inputClassName="date__return__input" />
        </div>
      </div>
    </>
  );
}
