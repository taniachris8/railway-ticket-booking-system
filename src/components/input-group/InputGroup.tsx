import type { InputHTMLAttributes, FC } from "react";

import styles from "./InputGroup.module.css";

type InputGroupProps = {
  label: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputGroup: FC<InputGroupProps> = ({
  label,
  error,
  ...inputProps
}: InputGroupProps) => {
  return (
    <div className={styles.input_group}>
      <label className={styles.label} htmlFor="last_name">
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.input_with_error : ""}`}
        {...inputProps}
      />
    </div>
  );
};
