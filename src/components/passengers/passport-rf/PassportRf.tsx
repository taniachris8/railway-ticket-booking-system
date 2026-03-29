import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./PassportRf.module.css";

type PassportRfProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
};

export function PassportRf({ passengerIndex, setErrorMessage }: PassportRfProps) {
  const dispatch = useDispatch();
  const { document_data } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
  );

  const [series, setSeries] = useState("");
  const [number, setNumber] = useState("");

  const [seriesError, setSeriesError] = useState(false);
  const [numberError, setNumberError] = useState(false);

    //   const [seriesPart = "", numberPart = ""] = document_data.split(" ");
    
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

  const handleSeriesBlur = () => {
    if (series.length < 4) {
      setErrorMessage("Серия паспорта должна состоять из 4 цифр.");
      setSeriesError(true);
      return;
    }

    if (series === "0000") {
      setErrorMessage(
        "Серия паспорта не может состоять из одних нулей. Введите корректную серию.",
      );
      setSeriesError(true);
      return;
    }

    const fullValue = `${series}${number ? " " + number : ""}`;

    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value: fullValue,
      }),
    );
    setErrorMessage("");
    setSeriesError(false);
  };

  const handleNumberBlur = () => {
    if (number.length < 6) {
      setErrorMessage("Номер паспорта должен состоять из 6 цифр.");
      setNumberError(true);
      return;
    }

    if (number === "000000") {
      setErrorMessage(
        "Номер паспорта не может состоять из одних нулей. Введите корректный номер.",
      );
      setNumberError(true);
      return;
    }

    const fullValue = `${series}${number ? " " + number : ""}`;

    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value: fullValue,
      }),
    );
    setErrorMessage("");
    setNumberError(false);
  };

  return (
    <>
      <div className={styles.input_group}>
        <label className={styles.label}>Серия</label>
        <div className={styles.input_wrapper}>
          <IMaskInput
            className={
              !seriesError
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
            onBlur={handleSeriesBlur}
            onFocus={() => setErrorMessage("")}
          />
        </div>
      </div>
      <div className={styles.input_group}>
        <label className={styles.label}>Номер</label>
        <div className={styles.input_wrapper}>
          <IMaskInput
            className={
              !numberError
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
            onBlur={handleNumberBlur}
            onFocus={() => setErrorMessage("")}
          />
        </div>
      </div>
    </>
  );
}
