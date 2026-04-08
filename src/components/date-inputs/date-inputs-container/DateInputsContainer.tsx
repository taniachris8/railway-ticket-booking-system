import { DepartureDateInput } from "../departure-date-input/DepartureDateInput";
import { ReturnDateInput } from "../return-date-input/ReturnDateInput";

import styles from "./DateInputsContainer.module.css";

export function DateInputsContainer({
  visibleDepartureDateTooltip,
}: {
  visibleDepartureDateTooltip: boolean}) {
  return (
    <>
      <div className={styles.date}>
        <label htmlFor="">Дата</label>
        <div className={styles.date__inputs}>
          <DepartureDateInput
            inputClassName={styles.date__departure_input}
            visibleDepartureDateTooltip={visibleDepartureDateTooltip}
          />
          <ReturnDateInput inputClassName={styles.date__return_input} />
        </div>
      </div>
    </>
  );
}
