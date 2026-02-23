import "./DirectionInputs.css";
import { useState } from "react";
import { DirectionInput } from "./DirectionInput";

type DepartureInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
};

export function DepartureInput({
  containerClassName,
  inputClassName,
  iconClassName,
}: DepartureInputProps) {
  const [departureCity, setDepartureCity] = useState("");

  return (
    <>
      <DirectionInput
        city={departureCity}
        setCity={setDepartureCity}
        placeholderText="Откуда"
        containerClassName={containerClassName}
        inputClassName={inputClassName}
        iconClassName={iconClassName}
      />
    </>
  );
}
