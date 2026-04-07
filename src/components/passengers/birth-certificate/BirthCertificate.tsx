import { IMaskInput } from "react-imask";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./BirthCertificate.module.css";

type BirthCertificateProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
  birthCertificateError: boolean;
  setBirthCertificateError: (value: boolean) => void;
};

export function BirthCertificate({
  passengerIndex,
  birthCertificateError,
  setBirthCertificateError,
  setErrorMessage,
}: BirthCertificateProps) {
  const dispatch = useDispatch();
  const { document_data } = useSelector(
    (state: RootState) =>
      state.passengers.departure.seats[passengerIndex].person_info,
  );

  const handleCertificateNumberChange = (value: string) => {
    dispatch(
      setPersonInfoField({
        seatIndex: passengerIndex,
        key: "document_data",
        value,
      }),
    );
  };

  return (
    <>
      <div className={styles.input_group}>
        <label className={styles.label}>Номер</label>
        <div className={styles.input_wrapper}>
          <IMaskInput
            className={
              !birthCertificateError
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
              setErrorMessage("");
              setBirthCertificateError(false);
            }}
          />
          {!document_data && (
            <div className={styles.fake_placeholder}>12 символов</div>
          )}
        </div>
      </div>
    </>
  );
}
