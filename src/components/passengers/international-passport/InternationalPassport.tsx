import { IMaskInput } from "react-imask";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./InternationalPassport.module.css";

type InternationalPassportProps = {
  passengerIndex: number;
  setErrorMessage: (message: string) => void;
  passportNumberError: boolean;
  setPassportNumberError: (value: boolean) => void;
};

export function InternationalPassport({
  passengerIndex,
  passportNumberError,
  setPassportNumberError,
  setErrorMessage,
}: InternationalPassportProps) {
  const dispatch = useDispatch();
  const { document_data } = useSelector(
    (state: RootState) =>
      state.passengers.departure.seats[passengerIndex].person_info,
  );

  const handlePassportNumberChange = (value: string) => {
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
              !passportNumberError
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
              setErrorMessage("");
              setPassportNumberError(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
