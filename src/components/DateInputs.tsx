import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);
setDefaultLocale("ru");

const CustomInput = forwardRef<
  HTMLDivElement,
  {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
    className?: string;
  }
>(({ value, onClick, placeholder, className }, ref) => (
  <div className={`date__input ${className || ""}`} onClick={onClick} ref={ref}>
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

export function DateInputs() {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const today = new Date();

  return (
    <>
      <div className="date">
        <label htmlFor="">Дата</label>
        <div className="date__inputs">
          <DatePicker
            minDate={today}
            locale="ru"
            selected={fromDate}
            onChange={(date: Date | null) => setFromDate(date)}
            dateFormat="dd/MM/yy"
            placeholderText="ДД/ММ/ГГ"
            popperPlacement="bottom-start"
            portalId="root-portal"
            customInput={<CustomInput className="date__input--from" />}
          />

          <DatePicker
            minDate={fromDate || today}
            locale="ru"
            selected={toDate}
            onChange={(date: Date | null) => setToDate(date)}
            dateFormat="dd/MM/yy"
            placeholderText="ДД/ММ/ГГ"
            popperPlacement="bottom-start"
            portalId="root-portal"
            customInput={<CustomInput className="date__input--to" />}
          />
        </div>
      </div>
    </>
  );
}
