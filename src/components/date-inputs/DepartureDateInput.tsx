import { useState } from "react";
import { DatePiker } from "./DatePiker";

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
 
  return (
    <>
      <DatePiker
        date={departureDate}
        setDate={setDepartureDate}
        inputClassName={inputClassName}
        inputFieldClassName={inputFieldClassName}
        iconClassName={iconClassName}
      />
    </>
  );
}
