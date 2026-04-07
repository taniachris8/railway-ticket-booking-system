import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./PassengerName.module.css";

type PassengerNameProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
  fieldWithError: "first_name" | "last_name" | "patronymic" | null;
  setFieldWithError: (
    value: "first_name" | "last_name" | "patronymic" | null,
  ) => void;
};

export function PassengerName({ passengerIndex, fieldWithError, setFieldWithError, setErrorMessage }: PassengerNameProps) {
  const dispatch = useDispatch();

  const { last_name, first_name, patronymic } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
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
    const formatted = formatName(e.target.value);
    
    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key,
        value: formatted,
      }),
    );
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
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
}
