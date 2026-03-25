import { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { Button } from "../../button/Button";

import { SelectOptionInput } from "../select-option-input/SelectOptionInput";
import { PassengerTypeDropdown } from "../passenger-type-dropdown/PassengerTypeDropdown";
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

type PassengerProps = {
  passengerIndex: number;
};

export function Passenger({ passengerIndex }: PassengerProps) {
  const [openForm, setOpenForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const {
    is_adult,
    first_name,
    last_name,
    patronymic,
    gender,
    birthday,
    document_type,
    document_data,
  } = useSelector(
    (state: RootState) => state.passengers.departure.seats[0].person_info,
    );

  const goToNextPassenger = () => {
   
  };

  return (
    <>
      <section className={styles.passenger}>
        <div
          className={
            openForm
              ? `${styles.passenger__header}`
              : `${styles.passenger__header} ${styles.passenger__header_closed}`
          }>
          <div className={styles.passenger__header_wrapper}>
            {!openForm && (
              <OpenIcon
                className={styles.passenger__icon_open}
                onClick={() => setOpenForm(true)}
              />
            )}
            {openForm && (
              <CloseIcon
                className={styles.passenger__icon}
                onClick={() => setOpenForm(false)}
              />
            )}
            <h3 className={styles.passenger__title}>
              Пассажир {passengerIndex + 1}
            </h3>
          </div>
          {openForm && (
            <CrossIcon
              className={styles.passenger__icon_close}
              onClick={() => setOpenForm(false)}
            />
          )}
        </div>
        {openForm && (
          <>
            <div className={styles.passenger__content}>
               <SelectOptionInput types={["Детский", "Взрослый"]} category="is_adult" setErrorMessage={setErrorMessage}/>
              <div className={styles.passenger_details_container}>
                <PassengerName setErrorMessage={setErrorMessage} />
                <div className={styles.passenger_personal_info}>
                  <PassengerGender />
                  <PassengerBirthday />
                </div>
                <PassengerCheckbox />
              </div>
            </div>
            <PassengerDocument setErrorMessage={setErrorMessage}/>
            <div
              className={
                !errorMessage
                  ? styles.passenger__footer
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
              {successfulSubmission && (
                <>
                  <div className={styles.success_container}>
                    <SuccessIcon className={styles.success__icon} />
                    <p className={styles.success_message}>Готово</p>
                  </div>
                </>
              )}
              {!errorMessage && (
                <Button
                  variant="change"
                  text="Следующий пассажир"
                  className={styles.passenger__button}
                  onClick={goToNextPassenger}
                />
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
