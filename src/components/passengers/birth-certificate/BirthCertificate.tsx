import { IMaskInput } from "react-imask";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";
import { isValidCertificateNumber } from "../../../utils/validatePersonsInfo";

import styles from "./BirthCertificate.module.css";

type BirthCertificateProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
};

export function BirthCertificate({ passengerIndex, setErrorMessage }: BirthCertificateProps) {
  const dispatch = useDispatch();
  const { document_data } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
  );
  const [error, setError] = useState(false);

  // const isValidCertificateNumber = (value: string) => {
  //   const regex = /^[A-ZА-ЯIVX]{1,4}-[A-ZА-Я]{2}-\d{6}$/i;
  //   return regex.test(value);
  // };

  const handleCertificateNumberChange = (value: string) => {
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

    if (!isValidCertificateNumber(document_data)) {
      setErrorMessage(
        "Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456",
      );
      setError(true);
    } else {
      // setErrorMessage("");
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
                    document_data.length === 14 ? styles.filled : ""
                  }`
                : `${styles.input} ${styles.input_error}`
            }
            mask="**************"
            definitions={{
              "*": /[A-Za-zА-Яа-яЁё0-9-]/,
            }}
            lazy={false}
            placeholderChar="_"
            overwrite
            unmask={true}
            value={document_data}
            onAccept={(value) => handleCertificateNumberChange(value)}
            onFocus={() => {
              // setErrorMessage("");
              setError(false);
            }}
            onBlur={handleBlur}
          />
          {!document_data && (
            <div className={styles.fake_placeholder}>12 символов</div>
          )}
        </div>
      </div>
    </>
  );
}
