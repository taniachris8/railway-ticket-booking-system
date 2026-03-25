import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import type { RootState } from "../../../state/store";

// import { setPassengersField } from "../../../state/reducers/passengersSlice";

import { BirthdayDropdown } from "../birthday-dropdown/BirthdayDropdown";

import styles from "./PassengerBirthday.module.css";

export function PassengerBirthday() {
  // const dispatch = useDispatch();
  // const birthday = useSelector((state: RootState) => state.passengers.birthday);

  const [birthdayDropdownActive, setBirthdayDropdownActive] = useState(false);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [birthDate, setBirthDate] = useState("");

     const birthdayDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("day:", day, "month:", month, "year:", year);
    if (day && month && year) {
      console.log("ALL SELECTED ");
      const formatted = `${day}.${month}.${year}`;
      setBirthDate(formatted);
      setBirthdayDropdownActive(false);
    }
  }, [day, month, year]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        birthdayDropdownRef.current &&
        !birthdayDropdownRef.current.contains(event.target as Node)
      ) {
        setBirthdayDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.input_group}>
      <label className={styles.label} htmlFor="birthday">
        Дата рождения
      </label>
      <div
        className={styles.birthday_group}
        onClick={(e) => {
          e.stopPropagation();
          setBirthdayDropdownActive(true);
        }}>
        <input
          type="text"
          id="birthday"
          placeholder="ДД/ММ/ГГ"
          value={birthDate}
          className={styles.input_birthday}
          readOnly
        />
        <img src="/icons/dropdown-arrow.png" alt="arrow-down" />
        {birthdayDropdownActive && (
          <div ref={birthdayDropdownRef}>
            <BirthdayDropdown
              setDay={setDay}
              setMonth={setMonth}
              setYear={setYear}
            />
          </div>
        )}
      </div>
    </div>
  );
}
