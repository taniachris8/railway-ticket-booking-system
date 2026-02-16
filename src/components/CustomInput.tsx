import { forwardRef } from "react";

const CustomInput = forwardRef<
  HTMLDivElement,
  { value?: string; onClick?: () => void; placeholder?: string }
>(({ value, onClick, placeholder }, ref) => (
  <div className="date__input-wrapper" onClick={onClick} ref={ref}>
    <input
      type="text"
      value={value || ""}
      placeholder={placeholder}
      readOnly
      className="date__input-field"
    />
    <img src="/icons/Group.png" alt="calendar" className="date__icon" />
  </div>
));