import { useState } from "react";
import { CustomInput } from "./CustomInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);
setDefaultLocale("ru");

export function ReturnDateInput() {
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const today = new Date();

  return (
    <>
      <DatePicker
        minDate={today}
        locale="ru"
        selected={returnDate}
        onChange={(date: Date | null) => setReturnDate(date)}
        dateFormat="dd/MM/yy"
        placeholderText="ДД/ММ/ГГ"
        popperPlacement="bottom-start"
        portalId="root-portal"
        customInput={<CustomInput className="date__input--to" />}
      />
    </>
  );
}
