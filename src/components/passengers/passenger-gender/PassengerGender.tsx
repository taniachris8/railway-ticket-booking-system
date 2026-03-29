import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./PassengerGender.module.css";

export function PassengerGender({ passengerIndex }: { passengerIndex: number }) {
  const dispatch = useDispatch();
  const { gender } = useSelector(
    (state: RootState) => state.passengers.departure.seats[passengerIndex].person_info,
  );

  return (
    <div className={styles.input_group}>
      <label className={styles.label} htmlFor="gender">
        Пол
      </label>
      <div className={styles.gender}>
        <div
          onClick={() => {
            dispatch(
              setPersonInfoField({
                seatIndex: passengerIndex,
                key: "gender",
                value: true,
              }),
            );
          }}
          className={`${styles.gender_item} ${gender ? styles.active : ""}`}>
          M
        </div>
        <div
          onClick={() => {
            dispatch(
              setPersonInfoField({
                seatIndex: passengerIndex,
                key: "gender",
                value: false,
              }),
            );
          }}
          className={`${styles.gender_item} ${!gender ? styles.active : ""}`}>
          Ж
        </div>
      </div>
    </div>
  );
}
