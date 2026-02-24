import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { CustomDateInput } from "./CustomDateInput";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);
setDefaultLocale("ru");

type DatePikerProps = {
  date: Date | null;
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
  onSelect: (date: Date | null) => void
};

export function DatePiker({
  date,
  onSelect,
  inputClassName,
  inputFieldClassName,
  iconClassName,
}: DatePikerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  return (
    <>
      <DatePicker
        showDisabledMonthNavigation
        minDate={today}
        maxDate={endOfYear}
        locale="ru"
        selected={date}
        onChange={(date: Date | null) => onSelect(date)}
        dateFormat="dd/MM/yy"
        placeholderText="ДД/ММ/ГГ"
        popperPlacement="bottom"
        portalId="root-portal"
        customInput={
          <CustomDateInput
            className={inputClassName}
            inputFieldClassName={inputFieldClassName}
            iconClassName={iconClassName}
          />
        }
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
          const month = date.toLocaleString("ru-RU", { month: "long" });

          const capitalizedMonth =
            month.charAt(0).toUpperCase() + month.slice(1);

          return (
            <div className="custom-header">
              <img
                className="custom-icon"
                src="/icons/calendar-left-arrow.png"
                alt="left arrow"
                onClick={decreaseMonth}
              />
              <span className="custom-month">{capitalizedMonth}</span>
              <img
                className="custom-icon"
                src="/icons/calendar-right-arrow.png"
                alt="right arrow"
                onClick={increaseMonth}
              />
            </div>
          );
        }}
      />
    </>
  );
}
