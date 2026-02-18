import { DepartureDateInput } from "./DepartureDateInput";
import { ReturnDateInput } from "./ReturnDateInput";

export function DateInputs() {
  return (
    <>
      <div className="date">
        <label htmlFor="">Дата</label>
        <div className="date__inputs">
          <DepartureDateInput />
          <ReturnDateInput />
        </div>
      </div>
    </>
  );
}
