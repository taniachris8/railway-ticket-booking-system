import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.css";
import { CustomDateInput } from "../custom-date-input/CustomDateInput";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);
setDefaultLocale("ru");

type CalendarProps = {
  date: Date | null;
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
  setDate: (date: Date | null) => void;
  minDate?: Date | null;
};

export function Calendar({
  date,
  setDate,
  inputClassName,
  inputFieldClassName,
  iconClassName,
  minDate,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  return (
    <>
      <DatePicker
        showDisabledMonthNavigation
        minDate={minDate ?? undefined}
        maxDate={endOfYear}
        locale="ru"
        selected={date}
        onChange={(date: Date | null) => setDate(date)}
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
          const month = format(date, "LLLL", { locale: ru });

          const capitalizedMonth =
            month.charAt(0).toUpperCase() + month.slice(1);

          return (
            <div className={styles.custom__header}>
              <img
                className={styles.custom__icon}
                src="/icons/calendar-left-arrow.png"
                alt="left arrow"
                onClick={decreaseMonth}
              />
              <span className={styles.custom__month}>{capitalizedMonth}</span>
              <img
                className={styles.custom__icon}
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
