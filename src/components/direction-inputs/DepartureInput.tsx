import { LocationIcon } from "../../icons/LocationIcon";
import "./DirectionInputs.css";

type DepartureInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
}

export function DepartureInput({
  containerClassName,
  inputClassName,
  iconClassName,
}: DepartureInputProps) {
  return (
    <>
      <div className={containerClassName}>
        <input
          type="text"
          className={ inputClassName}
          placeholder="Откуда"
        />
        <LocationIcon className={ iconClassName} />
      </div>
    </>
  );
}