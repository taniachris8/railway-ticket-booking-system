import styles from "./DateInputs.module.css"
import { DepartureDateInput } from "./DepartureDateInput";
import { ReturnDateInput } from "./ReturnDateInput";

export function DateInputs() {
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
