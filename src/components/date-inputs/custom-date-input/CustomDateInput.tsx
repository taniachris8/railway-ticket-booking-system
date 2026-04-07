import { forwardRef } from "react";

import { CalendarIcon } from "../../../icons/CalendarIcon";

import styles from "./CustomDateInput.module.css";

type CustomDateInputProps = {
  value?: string;
  onClick?: () => void;
  onClear?: () => void;
  inputActive: boolean;
  setInputActive: (value: boolean) => void;
  placeholder?: string;
  className?: string;
  inputFieldClassName?: string;
  iconClassName?: string;
};

export const CustomDateInput = forwardRef<HTMLDivElement, CustomDateInputProps>(
  (
    {
      value,
      onClick,
      onClear,
      inputActive,
      setInputActive,
      placeholder,
      className,
      inputFieldClassName,
      iconClassName,
    },
    ref,
  ) => (
    <div
      className={`${styles.custom__date_input} ${className || ""}`}
      onClick={onClick}
      ref={ref}>
      <input
        type="text"
        value={value || ""}
        placeholder={placeholder}
        readOnly
        className={`${styles.date__input_field} ${inputFieldClassName}`}
        onFocus={() => setInputActive(true)}
      />
      {value && inputActive && (
        <button
          className={styles.button}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}>
          ✕
        </button>
      )}
      <CalendarIcon className={`${styles.date__icon} ${iconClassName}`} />
    </div>
  ),
);
