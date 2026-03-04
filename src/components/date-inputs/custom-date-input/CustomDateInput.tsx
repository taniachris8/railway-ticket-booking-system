import styles from "./CustomDateInput.module.css";
import { forwardRef } from "react";
import { CalendarIcon } from "../../../icons/CalendarIcon";


type CustomDateInputProps = {
  value?: string;
  onClick?: () => void;
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
      />
      <CalendarIcon className={`${styles.date__icon} ${iconClassName}`} />
    </div>
  ),
);
