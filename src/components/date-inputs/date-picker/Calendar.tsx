import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { useState } from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

import { CustomDateInput } from "../custom-date-input/CustomDateInput";
import { getPublicAssetPath } from "../../../utils/getPublicAssetPath";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.css";

registerLocale("ru", ru);
setDefaultLocale("ru");

type CalendarProps = {
  date: string | Date | null;
  inputClassName?: string;
  inputFieldClassName?: string;
  iconClassName?: string;
  setDate: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
};

export function Calendar({
  date,
  setDate,
  inputClassName,
  inputFieldClassName,
  iconClassName,
  minDate,
  maxDate
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  

  const [inputActive, setInputActive] = useState(false)

  return (
    <>
      <DatePicker
        showDisabledMonthNavigation
        minDate={minDate ?? undefined}
        maxDate={maxDate}
        locale="ru"
        selected={date}
        onChange={(date: Date | null) => { setDate(date); setInputActive(false) }}
        dateFormat="dd/MM/yy"
        placeholderText="ДД/ММ/ГГ"
        popperPlacement="bottom"
        portalId="root-portal"
        customInput={
          <CustomDateInput
            className={inputClassName}
            inputFieldClassName={inputFieldClassName}
            iconClassName={iconClassName}
            onClear={() => setDate(null)}
            inputActive={ inputActive}
            setInputActive={setInputActive}
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
                src={getPublicAssetPath("/icons/calendar-left-arrow.png")}
                alt="left arrow"
                onClick={decreaseMonth}
              />
              <span className={styles.custom__month}>{capitalizedMonth}</span>
              <img
                className={styles.custom__icon}
                src={getPublicAssetPath("/icons/calendar-right-arrow.png")}
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
