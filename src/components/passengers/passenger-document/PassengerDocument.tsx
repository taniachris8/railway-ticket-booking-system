import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";
import { useState } from "react";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import { SelectOptionInput } from "../select-option-input/SelectOptionInput";

import styles from "./PassengerDocument.module.css";
import { validateDocumentData } from "../../../utils/validatePersonsInfo";

export function PassengerDocument({ setErrorMessage }: { setErrorMessage: (message: string) => void }) {
  const dispatch = useDispatch();
  const documentTypes = ["Паспорт РФ", "Свидетельство о рождении"];

  const [certificateNumber, setCertificateNumber] = useState("");
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const { document_type, is_adult } = useSelector(
    (state: RootState) => state.passengers.departure.seats[0].person_info,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setPersonInfoField({
        seatIndex: 0,
        key: "document_data",
        value: e.target.value,
      }),
    );
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    dispatch(
      setPersonInfoField({
        seatIndex: 0,
        key: "document_data",
        value
      }),
    );

    if (!validateDocumentData(document_type, value)) {
      setErrorMessage(
        `Номер документа указан неверно.`,
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleFocus = () => {
    setErrorMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_group}>
        <label className={styles.label}>Тип документа</label>
        <SelectOptionInput category="document_type" types={documentTypes} setErrorMessage={setErrorMessage}/>
      </div>

      <div className={styles.document_number_inputs}>
        {document_type === "Паспорт РФ" && (
          <>
            <div className={styles.input_group}>
              <label className={styles.label}>Серия</label>
              <div className={styles.input_wrapper}>
                <IMaskInput
                  className={`${styles.input} ${
                    passportSeries.length === 4 ? styles.filled : ""
                  }`}
                  mask="0 0 0 0"
                  lazy={false}
                  placeholderChar="_"
                  overwrite
                  unmask={true}
                  value={passportSeries}
                  onAccept={(value) => setPassportSeries(value)}
                />
              </div>
            </div>
            <div className={styles.input_group}>
              <label className={styles.label}>Номер</label>
              <div className={styles.input_wrapper}>
                <IMaskInput
                  className={`${styles.input} ${
                    passportNumber.length === 6 ? styles.filled : ""
                  }`}
                  mask="0 0 0 0 0 0"
                  lazy={false}
                  placeholderChar="_"
                  overwrite
                  unmask={true}
                  value={passportNumber}
                  onAccept={(value) => setPassportNumber(value)}
                />
              </div>
            </div>
          </>
        )}
        {document_type === "Свидетельство о рождении" && (
          <div className={styles.input_group}>
            <label className={styles.label}>Номер</label>
            <div className={styles.input_wrapper}>
              <IMaskInput
                className={`${styles.input} ${styles.certificate} ${
                  certificateNumber.length === 12 ? styles.filled : ""
                }`}
                mask="0 0 0 0 0 0 0 0 0 0 0 0"
                lazy={false}
                placeholderChar="_"
                overwrite
                unmask={true}
                value={certificateNumber}
                onAccept={(value) => setCertificateNumber(value)}
              />
              {!certificateNumber && (
                <div className={styles.fake_placeholder}>12 символов</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
