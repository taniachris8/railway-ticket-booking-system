import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./PassportRf.module.css";

type PassportRfProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
  passportRfError: boolean;
  setPassportRfError: (value: boolean) => void;
};

export function PassportRf({
  passengerIndex,
  setErrorMessage,
  passportRfError,
  setPassportRfError,
}: PassportRfProps) {
  const dispatch = useDispatch();
  const { document_data } = useSelector(
    (state: RootState) =>
      state.passengers.departure.seats[passengerIndex].person_info,
  );

  const [series, setSeries] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const [s = "", n = ""] = document_data.split(" ");
    setSeries(s);
    setNumber(n);
  }, [document_data]);

  const handleChangeSeries = (value: string) => {
    setSeries(value);
    const fullValue = `${value}${number ? " " + number : ""}`;

    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value: fullValue,
      }),
    );
  };

  const handleChangeNumber = (value: string) => {
    setNumber(value);

    const fullValue = `${series}${value ? " " + value : ""}`;

    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value: fullValue,
      }),
    );
  };

  return (
    <>
      <div className={styles.input_group}>
        <label className={styles.label}>Серия</label>
        <div className={styles.input_wrapper}>
          <IMaskInput
            className={
              !passportRfError
                ? `${styles.input} ${series.length === 4 ? styles.filled : ""}`
                : `${styles.input} ${styles.input_error}`
            }
            mask="0 0 0 0"
            lazy={false}
            placeholderChar="_"
            overwrite
            unmask={true}
            value={series}
            onAccept={(value) => handleChangeSeries(value)}
            onFocus={() => {
              setErrorMessage("");
              setPassportRfError(false);
            }}
          />
        </div>
      </div>
      <div className={styles.input_group}>
        <label className={styles.label}>Номер</label>
        <div className={styles.input_wrapper}>
          <IMaskInput
            className={
              !passportRfError
                ? `${styles.input} ${number.length === 6 ? styles.filled : ""}`
                : `${styles.input} ${styles.input_error}`
            }
            mask="0 0 0 0 0 0"
            lazy={false}
            placeholderChar="_"
            overwrite
            unmask={true}
            value={number}
            onAccept={(value) => handleChangeNumber(value)}
            onFocus={() => {
              setErrorMessage("");
              setPassportRfError(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
