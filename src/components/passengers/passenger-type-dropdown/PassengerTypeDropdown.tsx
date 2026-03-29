import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../state/store";
import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./PassengerTypeDropdown.module.css";
import { calculateAge } from "../../../utils/validatePersonsInfo";

type PassengerTypeProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
  setDropdownActive: (active: boolean) => void;
};

export function PassengerTypeDropdown({
  passengerIndex,
  setErrorMessage,
  setDropdownActive,
}: PassengerTypeProps) {
  const dispatch = useDispatch();
  const { document_type, birthday } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
  );

  const types = [
    {
      label: "Взрослый",
      is_adult: true,
    },
    {
      label: "Детский",
      is_adult: false,
    },
  ];

  const handleSelect = (isAdult: boolean) => {
    const age = calculateAge(birthday);

    if (age !== null) {
      if (age < 18 && isAdult) {
        setErrorMessage(
          "Пассажир младше 18 лет не может быть указан как взрослый. Выберите детский тип пассажира или измените дату рождения.",
        );
        
        return;
      }

      if (age >= 18 && !isAdult) {
        setErrorMessage(
          "Пассажир старше 18 лет не может быть указан как детский. Выберите взрослый тип пассажира или измените дату рождения.",
        );
       
        return;
      }
    }

    if (document_type === "birth_certificate" && isAdult) {
      setErrorMessage(
        "Взрослый пассажир старше 18 лет не может указать свидетельство о рождении в качестве документа. Выберите другой тип документа.",
      );

      return;
    }
    dispatch(
      setPersonInfoField({ seatIndex: passengerIndex, key: "is_adult", value: isAdult }),
    );
    setErrorMessage("");
  };

  return (
    <>
      <ul className={styles.dropdown}>
        {types.map((type) => (
          <li
            key={type.label}
            className={styles.item}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(type.is_adult);
              setDropdownActive(false);
            }}>
            {type.label}
          </li>
        ))}
      </ul>
    </>
  );
}
