import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";
import { validateBirthday } from "../../../utils/validatePersonsInfo";

import { BirthdayDropdown } from "../birthday-dropdown/BirthdayDropdown";

import styles from "./PassengerBirthday.module.css";

export function PassengerBirthday({
  passengerIndex,
  setErrorMessage,
}: {
  setErrorMessage: (message: string) => void; passengerIndex: number;
}) {
  const dispatch = useDispatch();
  const {birthday, is_adult } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
  );

  const [birthdayDropdownActive, setBirthdayDropdownActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);


  const birthdayDropdownRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };


  const validateAndDispatch = (y: number, m: number, d: number) => {
    const formattedForSlice = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (validateBirthday(formattedForSlice, is_adult)) {
      dispatch(
        setPersonInfoField({
          seatIndex: passengerIndex,
          key: "birthday",
          value: formattedForSlice,
        }),
      );
      setErrorMessage("");
    } else {
      setErrorMessage(
        `Дата рождения указана неверно. Если пассажиру ${is_adult ? "меньше" : "больше"} 18 лет, выберите ${is_adult ? "детский" : "взрослый"} тип пассажира в начале формы`,
      );
      setSelectedDate(null);

      dispatch(
        setPersonInfoField({
          seatIndex: passengerIndex,
          key: "birthday",
          value: "",
        }),
      );
    }
  };

  useEffect(() => {
    if (!selectedDate) return;

    const { day, month, year } = selectedDate;

    if (!day || !month || !year) return;

    setBirthdayDropdownActive(false);

    validateAndDispatch(year, month, day);
  }, [selectedDate]);

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
          value={formatDate(birthday)}
          className={styles.input_birthday}
          onFocus={() => setErrorMessage("")}
          readOnly
        />
        <img src="/icons/dropdown-arrow.png" alt="arrow-down" />
        {birthdayDropdownActive && (
          <div ref={birthdayDropdownRef}>
            <BirthdayDropdown setSelectedDate={setSelectedDate} />
          </div>
        )}
      </div>
    </div>
  );
}
