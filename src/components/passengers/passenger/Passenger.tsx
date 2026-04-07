import { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { Button } from "../../button/Button";

import { SelectOptionInput } from "../select-option-input/SelectOptionInput";
import { PassengerDocument } from "../passenger-document/PassengerDocument";
import { PassengerCheckbox } from "../passenger-checkbox/PassengerCheckbox";
import { PassengerBirthday } from "../passenger-birthday/PassengerBirthday";
import { PassengerGender } from "../passenger-gender/PassengerGender";
import { PassengerName } from "../passenger-name/PassengerName";

import { CloseIcon } from "../../../icons/CloseIcon";
import { CrossIcon } from "../../../icons/CrossIcon";
import { OpenIcon } from "../../../icons/OpenIcon";
import { ErrorIcon } from "../../../icons/passenger-form/ErrorIcon";

import styles from "./Passenger.module.css";
import { SuccessIcon } from "../../../icons/passenger-form/SuccessIcon";
import { PassengerTypeDropdown } from "../passenger-type-dropdown/PassengerTypeDropdown";
import {
  isValidDocumentNumber,
  validateBirthday,
  validateName,
} from "../../../utils/validatePersonsInfo";

type PassengerProps = {
  passengerIndex: number;
  openedPassengerIndex: number | null;
  setOpenedPassengerIndex: (index: number | null) => void;
};

export function Passenger({
  passengerIndex,
  openedPassengerIndex,
  setOpenedPassengerIndex,
}: PassengerProps) {
  const isOpen = openedPassengerIndex === passengerIndex;

  const [errorMessage, setErrorMessage] = useState("");
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const [fieldWithError, setFieldWithError] = useState<
    "first_name" | "last_name" | "patronymic" | null
  >(null);
  const [birthCertificateError, setBirthCertificateError] = useState(false);
  const [passportRfError, setPassportRfError] = useState(false);
  const [passportNumberError, setPassportNumberError] = useState(false);

  const {
    is_adult,
    first_name,
    last_name,
    patronymic,
    birthday,
    document_type,
    document_data,
  } = useSelector(
    (state: RootState) =>
      state.passengers.departure.seats[passengerIndex].person_info,
  );

  const goToNextPassenger = () => {
    const isNameValid = validateName(first_name);
    const isLastNameValid = validateName(last_name);
    const isPatronymicValid = validateName(patronymic);
    const isBirthdayValid = validateBirthday(birthday, is_adult);
    const isDocumentValid = isValidDocumentNumber(document_type, document_data);

    if (
      isNameValid &&
      isLastNameValid &&
      isPatronymicValid &&
      isBirthdayValid &&
      isDocumentValid &&
      !errorMessage
    ) {
      setSuccessfulSubmission(true);
      setOpenedPassengerIndex(passengerIndex + 1);
      setErrorMessage("");
    } else {
      if (!isNameValid) {
        setErrorMessage(
          "Имя указано неверно. Имя должно содержать только буквы и быть от 2 до 20 символов.",
        );
        setFieldWithError("first_name");
        setSuccessfulSubmission(false);
      }
      if (!isLastNameValid) {
        setErrorMessage(
          "Фамилия указана неверно. Фамилия должна содержать только буквы и быть от 2 до 20 символов.",
        );
        setFieldWithError("last_name");
        setSuccessfulSubmission(false);
      }
      if (!isPatronymicValid) {
        setErrorMessage(
          "Отчество указано неверно. Отчество должно содержать только буквы и быть от 2 до 20 символов.",
        );
        setFieldWithError("patronymic");
        setSuccessfulSubmission(false);
      }
      if (!isBirthdayValid) {
        setErrorMessage("Введите дату рождения");
        setSuccessfulSubmission(false);
      }
      if (!isDocumentValid) {
        if (document_type === "passport") {
          setPassportNumberError(true);
          setErrorMessage(
            "Введите коректный номер загранпаспорта. Пример: 45 6790195",
          );
          setSuccessfulSubmission(false);
        } else if (document_type === "passport_rf") {
          setErrorMessage(
            "Введите коректный номер паспорта РФ, Пример: 1245 679019",
          );
          setSuccessfulSubmission(false);
        } else if (document_type === "birth_certificate") {
          setBirthCertificateError(true);
          setErrorMessage(
            "Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456",
          );
          setSuccessfulSubmission(false);
        }
      }
    }
  };

  return (
    <>
      <section className={styles.passenger}>
        <div
          className={
            isOpen
              ? `${styles.passenger__header}`
              : `${styles.passenger__header} ${styles.passenger__header_closed}`
          }>
          <div className={styles.passenger__header_wrapper}>
            {!isOpen && (
              <OpenIcon
                className={styles.passenger__icon_open}
                onClick={() => setOpenedPassengerIndex(passengerIndex)}
              />
            )}
            {isOpen && (
              <CloseIcon
                className={styles.passenger__icon}
                onClick={() => setOpenedPassengerIndex(null)}
              />
            )}
            <h3 className={styles.passenger__title}>
              Пассажир {passengerIndex + 1}
            </h3>
          </div>
          {isOpen && (
            <CrossIcon
              className={styles.passenger__icon_close}
              onClick={() => setOpenedPassengerIndex(null)}
            />
          )}
        </div>
        {isOpen && (
          <>
            <div className={styles.passenger__content}>
              <SelectOptionInput
                selected={is_adult ? "Взрослый" : "Детский"}
                dropdownActive={dropdownActive}
                setDropdownActive={setDropdownActive}>
                <PassengerTypeDropdown
                  passengerIndex={passengerIndex}
                  setErrorMessage={setErrorMessage}
                  setDropdownActive={setDropdownActive}
                />
              </SelectOptionInput>
              <div className={styles.passenger_details_container}>
                <PassengerName
                  passengerIndex={passengerIndex}
                  setErrorMessage={setErrorMessage}
                  fieldWithError={fieldWithError}
                  setFieldWithError={setFieldWithError}
                />
                <div className={styles.passenger_personal_info}>
                  <PassengerGender passengerIndex={passengerIndex} />
                  <PassengerBirthday
                    passengerIndex={passengerIndex}
                    setErrorMessage={setErrorMessage}
                  />
                </div>
                <PassengerCheckbox text="ограниченная подвижность" />
              </div>
            </div>
            <PassengerDocument
              passengerIndex={passengerIndex}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              birthCertificateError={birthCertificateError}
              setBirthCertificateError={setBirthCertificateError}
              passportNumberError={passportNumberError}
              setPassportNumberError={setPassportNumberError}
              passportRfError={passportRfError}
              setPassportRfError={setPassportRfError}
            />
            <div
              className={
                !errorMessage
                  ? successfulSubmission
                    ? `${styles.passenger__footer} ${styles.passenger__footer_success}`
                    : `${styles.passenger__footer}`
                  : `${styles.passenger__footer} ${styles.passenger__footer_with_error}`
              }>
              {errorMessage && (
                <>
                  <div className={styles.error_container}>
                    <ErrorIcon className={styles.error__icon} />
                    <p className={styles.error_message}>{errorMessage}</p>
                  </div>
                </>
              )}
              {!errorMessage && (
                <div className={styles.passenger__footer_group}>
                  {successfulSubmission && (
                    <div className={styles.success_container}>
                      <SuccessIcon className={styles.success__icon} />
                      <p className={styles.success_message}>Готово</p>
                    </div>
                  )}
                  <Button
                    variant="change"
                    text="Следующий пассажир"
                    className={styles.passenger__button}
                    onClick={goToNextPassenger}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
