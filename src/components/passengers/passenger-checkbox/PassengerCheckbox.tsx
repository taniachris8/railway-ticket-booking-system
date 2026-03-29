import styles from "./PassengerCheckbox.module.css";

type PassengerCheckboxProps = {
  text: string
}

export function PassengerCheckbox({ text} : PassengerCheckboxProps) { 
    return (
      <>
        <div className={styles.checkbox}>
          <label className={styles.checkbox_wrapper}>
            <input type="checkbox" className={styles.checkbox_input} />
          </label>
          <span className={styles.checkbox_text}>{ text}</span>
        </div>
      </>
    );
}