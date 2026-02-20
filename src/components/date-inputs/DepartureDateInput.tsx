import { useState } from "react";
import { CustomDateInput } from "./CustomDateInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);
setDefaultLocale("ru");

type DepartureDateInputProps = {
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
};

export function DepartureDateInput({
  inputClassName,
  inputFieldClassName,
  iconClassName,
}: DepartureDateInputProps) {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const today = new Date();

  return (
    <>
      <DatePicker
        minDate={today}
        locale="ru"
        selected={departureDate}
        onChange={(date: Date | null) => setDepartureDate(date)}
        dateFormat="dd/MM/yy"
        placeholderText="ДД/ММ/ГГ"
        popperPlacement="bottom-start"
        portalId="root-portal"
        customInput={
          <CustomDateInput
            className={inputClassName}
            inputFieldClassName={inputFieldClassName}
            iconClassName={iconClassName}
          />
        }
      />
    </>
  );
}
