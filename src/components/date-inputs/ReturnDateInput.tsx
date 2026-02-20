import { useState } from "react";
import { CustomDateInput } from "./CustomDateInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);
setDefaultLocale("ru");

type ReturnDateInputProps = {
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
};

export function ReturnDateInput({
  inputClassName,
  inputFieldClassName,
  iconClassName,
}: ReturnDateInputProps) {
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
