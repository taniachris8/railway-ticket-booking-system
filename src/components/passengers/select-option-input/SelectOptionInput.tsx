import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./SelectOptionInput.module.css";

type SelectOptionInputProps = {
  types: string[];
  category: "document_type" | "is_adult";
  setErrorMessage: (message: string) => void;
};

export function SelectOptionInput({
  types,
  category,
  setErrorMessage,
}: SelectOptionInputProps) {
  const { is_adult } = useSelector(
    (state: RootState) => state.passengers.departure.seats[0].person_info,
  );
  const [dropdownActive, setDropdownActive] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(types[0]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (type: string) => {
    if (category === "is_adult") {
      dispatch(
        setPersonInfoField({
          seatIndex: 0,
          key: category,
          value: type === "Взрослый" ? true : false,
        }),
      );
      setSelected(type);
    } else {
      if (type === "Свидетельство о рождении" && is_adult) {
        setErrorMessage(
          "Взрослый пассажир старше 18 лет не может указать свидетельство о рождении в качестве документа. Выберите другой тип документа.",
        );
        setSelected(types[0]);
        setDropdownActive(false);
        return;
      }
      dispatch(
        setPersonInfoField({ seatIndex: 0, key: category, value: type }),
      );
      setSelected(type);
      setErrorMessage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef}>
        <div
          className={
            selected === "Свидетельство о рождении"
              ? `${styles.input} ${styles.input_long}`
              : styles.input
          }
          onClick={() => setDropdownActive(true)}>
          <p className={styles.value}>{selected}</p>
          <img src="/icons/dropdown-arrow.png" alt="arrow-down" />
          {dropdownActive && (
            <ul className={styles.dropdown}>
              {types.map((type, index) => (
                <li
                  key={index}
                  className={styles.item}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(type);
                    setDropdownActive(false);
                  }}>
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
