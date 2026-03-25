import styles from "./PassengerCheckbox.module.css";

export function PassengerCheckbox() { 
    return (
      <>
        <div className={styles.checkbox}>
          <label className={styles.checkbox_wrapper}>
            <input type="checkbox" className={styles.checkbox_input} />
          </label>
          <span className={styles.checkbox_text}>ограниченная подвижность</span>
        </div>
      </>
    );
}