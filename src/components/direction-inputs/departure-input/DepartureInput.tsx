import { CityAutocompleteInput } from "../city-autocomplete-input/CityAutocompleteInput";

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
  return (
    <CityAutocompleteInput
      containerClassName={containerClassName}
      inputClassName={inputClassName}
      iconClassName={iconClassName}
      placeholder="Откуда"
      cityKey="from_city"
      cityIdKey="from_city_id"
    />
  );
}
