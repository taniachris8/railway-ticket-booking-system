import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";
import { useState } from "react";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import { validateName } from "../../../utils/validatePersonsInfo";

import styles from "./PassengerName.module.css";

type PassengerNameProps = {
  setErrorMessage: (message: string) => void;
};

export function PassengerName({ setErrorMessage }: PassengerNameProps) {
  const dispatch = useDispatch();
  const [fieldWithError, setFieldWithError] = useState<
    "first_name" | "last_name" | "patronymic" | null
  >(null);

  const { last_name, first_name, patronymic } = useSelector(
    (state: RootState) => state.passengers.departure.seats[0].person_info,
  );

  console.log(
    "from passenger name component",
    last_name,
    first_name,
    patronymic,
  );

  const formatName = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";

    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "first_name" | "last_name" | "patronymic",
  ) => {
    dispatch(
      setPersonInfoField({
        seatIndex: 0,
        key,
        value: e.target.value,
      }),
    );
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    key: "first_name" | "last_name" | "patronymic",
  ) => {
    const formatted = formatName(e.target.value);
    console.log("formatted:", JSON.stringify(formatted));

    dispatch(
      setPersonInfoField({
        seatIndex: 0,
        key,
        value: formatted,
      }),
    );

    if (!validateName(formatted)) {
      const fieldWithErrors =
        key === "first_name"
          ? "Имя"
          : key === "last_name"
            ? "Фамилия"
            : "Отчество";
      setFieldWithError(key);
      setErrorMessage(
        `${fieldWithErrors} указано неверно. ${fieldWithErrors} должно содержать только буквы и быть от 2 до 20 символов.`,
      );
    } else {
      setFieldWithError(null);
      setErrorMessage("");
    }
  };

  const handleFocus = () => {
    setErrorMessage("");
    setFieldWithError(null);
  };

  return (
    <div className={styles.full_name}>
      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="last_name">
          Фамилия
        </label>
        <input
          className={
            fieldWithError === "last_name"
              ? `${styles.input} ${styles.input_with_error}`
              : styles.input
          }
          type="text"
          id="last_name"
          placeholder=""
          value={last_name}
          onChange={(e) => handleChange(e, "last_name")}
          onBlur={(e) => handleBlur(e, "last_name")}
          onFocus={handleFocus}
        />
      </div>
      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="first_name">
          Имя
        </label>
        <input
          className={
            fieldWithError === "first_name"
              ? `${styles.input} ${styles.input_with_error}`
              : styles.input
          }
          type="text"
          id="first_name"
          placeholder=""
          value={first_name}
          onChange={(e) => handleChange(e, "first_name")}
          onBlur={(e) => handleBlur(e, "first_name")}
          onFocus={handleFocus}
        />
      </div>

      <div className={styles.input_group}>
        <label className={styles.label} htmlFor="patronymic">
          Отчество
        </label>
        <input
          className={
            fieldWithError === "patronymic"
              ? `${styles.input} ${styles.input_with_error}`
              : styles.input
          }
          type="text"
          id="patronymic"
          placeholder=""
          value={patronymic}
          onChange={(e) => handleChange(e, "patronymic")}
          onBlur={(e) => handleBlur(e, "patronymic")}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
}
