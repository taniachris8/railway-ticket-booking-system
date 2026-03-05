import { CityAutocompleteInput } from "./CityAutocompleteInput";

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
    <CityAutocompleteInput
      containerClassName={containerClassName}
      inputClassName={inputClassName}
      iconClassName={iconClassName}
      placeholder="Куда"
      cityKey="to_city"
      cityIdKey="to_city_id"
    />
  );
}
