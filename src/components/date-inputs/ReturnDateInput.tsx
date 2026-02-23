import { useState } from "react";
import { DatePiker } from "./DatePiker";

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

  return (
    <>
      <DatePiker
        date={returnDate}
        setDate={setReturnDate}
        inputClassName={inputClassName}
        inputFieldClassName={inputFieldClassName}
        iconClassName={iconClassName}
      />
    </>
  );
}
