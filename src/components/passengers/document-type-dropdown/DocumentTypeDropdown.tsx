import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../state/store";
import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./DocumentTypeDropdown.module.css";

type DocumentTypeDropdownProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
  setDropdownActive: (active: boolean) => void;
};

export function DocumentTypeDropdown({
  passengerIndex,
  setErrorMessage,
  setDropdownActive,
}: DocumentTypeDropdownProps) {
  const dispatch = useDispatch();
  const { is_adult } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
  );

  const types = [
    { label: "Паспорт РФ", value: "passport_rf" },
    { label: "Свидетельство о рождении", value: "birth_certificate" },
    { label: "Паспорт", value: "passport" },
  ];

  const handleSelect = (value: string) => {
    if (value === "birth_certificate" && is_adult) {
      setErrorMessage(
        "Взрослый пассажир старше 18 лет не может указать свидетельство о рождении в качестве документа. Выберите другой тип документа.",
      );
      return;
    }

    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_type",
        value,
      }),
    );

    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value: "",
      }),
    );
    setErrorMessage("");
  };

  return (
    <>
      <ul className={styles.dropdown}>
        {types.map((type) => (
          <li
            key={type.value}
            className={styles.item}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(type.value);
              setDropdownActive(false);
            }}>
            {type.label}
          </li>
        ))}
      </ul>
    </>
  );
}
