import { LocationIcon } from "../../icons/LocationIcon";
import "./DirectionInputs.css";

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
  return (
    <>
      <div className={containerClassName}>
        <input type="text" className={inputClassName} placeholder="Куда" />
        <LocationIcon className={iconClassName} />
      </div>
    </>
  );
}
