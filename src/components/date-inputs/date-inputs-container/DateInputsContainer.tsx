import { DepartureDateInput } from "../departure-date-input/DepartureDateInput";
import { ReturnDateInput } from "../return-date-input/ReturnDateInput";

import styles from "./DateInputsContainer.module.css";

export function DateInputsContainer() {
  return (
    <>
      <div className={styles.date}>
        <label htmlFor="">Дата</label>
        <div className={styles.date__inputs}>
          <DepartureDateInput inputClassName={styles.date__departure_input} />
          <ReturnDateInput inputClassName={styles.date__return_input} />
        </div>
      </div>
    </>
  );
}
