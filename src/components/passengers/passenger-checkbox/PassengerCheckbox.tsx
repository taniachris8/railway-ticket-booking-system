import styles from "./PassengerCheckbox.module.css";

type PassengerCheckboxProps = {
  text: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  textClassName?: string;
};

export function PassengerCheckbox({ text, checked, onChange, containerClassName, labelClassName, inputClassName, textClassName }: PassengerCheckboxProps) {
  return (
    <>
      <div className={`${styles.checkbox} ${containerClassName}`}>
        <label className={`${styles.checkbox_wrapper} ${labelClassName}`}>
          <input
            type="checkbox"
            className={`${styles.checkbox_input} ${inputClassName}`}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
          />
        </label>
        <span className={`${styles.checkbox_text} ${textClassName}`}>
          {text}
        </span>
      </div>
    </>
  );
}
