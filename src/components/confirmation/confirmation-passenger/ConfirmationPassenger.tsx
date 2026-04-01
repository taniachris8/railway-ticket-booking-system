import type { SeatsForOrderType } from "../../../types";

import { PassengerIcon } from "../../../icons/PassengerIcon";

import styles from "./ConfirmationPassenger.module.css";

type ConfirmationPassengerProps = {
  passenger: SeatsForOrderType;
};

export function ConfirmationPassenger({
  passenger,
}: ConfirmationPassengerProps) {
  const { person_info, seat_number, is_child, include_children_seat } =
    passenger;

  const {
    is_adult,
    first_name,
    last_name,
    patronymic,
    gender,
    birthday,
    document_type,
    document_data,
  } = person_info;

  const formatBirthday = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      <div className={styles.passenger}>
        <div className={styles.passenger__icon_wrapper}>
          <PassengerIcon className={styles.passenger__icon} />
          <p className={styles.passenger__type}>
            {is_adult ? "Взрослый" : "Детский"}
          </p>
        </div>
        <div className={styles.passenger__info}>
          <p
            className={
              styles.passenger__name
            }>{`${last_name} ${first_name} ${patronymic}`}</p>
          <div className={styles.passenger_details}>
            <div className={styles.passenger_detail}>
              <span>Пол</span>
              <span>{gender ? "мужской" : "женский"}</span>
            </div>
            <div className={styles.passenger_detail}>
              <span>Дата рождения</span>
              <span>{formatBirthday(birthday)}</span>
            </div>
            <div className={styles.passenger_detail}>
              <span>
                {document_type === "passport"
                  ? "Паспорт"
                  : document_type === "birth_certificate"
                    ? "Свидетельство о рождении"
                    : "Пасспорт РФ"}
              </span>
              <span>{document_data}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
