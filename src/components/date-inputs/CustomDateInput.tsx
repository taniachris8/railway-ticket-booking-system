import "./CustomDateInput.css"
import { forwardRef } from "react";
import { CalendarIcon } from "../../icons/CalendarIcon";

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
      className={`custom__date-input ${className || ""}`}
      onClick={onClick}
      ref={ref}>
      <input
        type="text"
        value={value || ""}
        placeholder={placeholder}
        readOnly
        className={`custom__date-input-field ${inputFieldClassName}`}
      />
      <CalendarIcon className={`custom__date-icon ${iconClassName}`} />
    </div>
  ),
);
