import { SelectOptionInput } from "../select-option-input/SelectOptionInput";

export function PassengerTypeDropdown() {
 
  return (
    <>
      <SelectOptionInput types={["Детский", "Взрослый"]} category="is_adult" />
    </>
  );
}
