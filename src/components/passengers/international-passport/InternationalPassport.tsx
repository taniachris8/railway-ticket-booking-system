import { IMaskInput } from "react-imask";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";
import { isValidInternationalPassportNumber } from "../../../utils/validatePersonsInfo";

import styles from "./InternationalPassport.module.css";

type InternationalPassportProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
};

export function InternationalPassport({
  passengerIndex,
  setErrorMessage,
}: InternationalPassportProps) {
  const dispatch = useDispatch();
  const { document_data } = useSelector(
    (state: RootState) =>
      state.passengers.departure.seats[passengerIndex].person_info,
  );

  const [error, setError] = useState(false);

  const handlePassportNumberChange = (value: string) => {
    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value,
      }),
    );
  };

  const handleBlur = () => {
    if (!document_data) return;
    if (!isValidInternationalPassportNumber(document_data)) {
      setErrorMessage("Номер паспорта указан некорректно. Пример: 45 6790195");
      setError(true);
    } else {
      setErrorMessage("");
      setError(false);
    }
  };

  return (
    <>
      <div className={styles.input_group}>
        <label className={styles.label}>Номер</label>
        <div className={styles.input_wrapper}>
          <IMaskInput
            className={
              !error
                ? `${styles.input} ${
                    document_data.length === 9 ? styles.filled : ""
                  }`
                : `${styles.input} ${styles.input_error}`
            }
            mask="00 0000000"
            lazy={false}
            placeholderChar="_"
            overwrite
            unmask={true}
            value={document_data}
            onAccept={(value) => handlePassportNumberChange(value)}
            onFocus={() => {
              // setErrorMessage("");
              setError(false);
            }}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </>
  );
}
