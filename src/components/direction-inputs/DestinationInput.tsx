import { DirectionInput } from "./DirectionInput";
import "./DirectionInputs.css";
import { useState } from "react";

type DestinationInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
};

export function DestinationInput({
  containerClassName,
  inputClassName,
  iconClassName,
}: DestinationInputProps) {
  const [destinationCity, setDestinationCity] = useState("");

  return (
    <>
      <DirectionInput
        city={destinationCity}
        setCity={setDestinationCity}
        placeholderText="Куда"
        containerClassName={containerClassName}
        inputClassName={inputClassName}
        iconClassName={iconClassName}
      />
    </>
  );
}
