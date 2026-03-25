import { useDispatch } from "react-redux";
import { useState } from "react";

import { setPersonInfoField } from "../../../state/reducers/passengersSlice";

import styles from "./PassengerGender.module.css";

export function PassengerGender() {
  const dispatch = useDispatch();
  const [sex, setSex] = useState("");

  return (
    <div className={styles.input_group}>
      <label className={styles.label} htmlFor="gender">
        Пол
      </label>
      <div className={styles.gender}>
        <div
          onClick={() => {
            setSex("male");
            dispatch(
              setPersonInfoField({
                seatIndex: 0,
                key: "gender",
                value: true,
              }),
            );
          }}
          className={`${styles.gender_item} ${sex === "male" ? styles.active : ""}`}>
          M
        </div>
        <div
          onClick={() => {
            setSex("female");
            dispatch(
              setPersonInfoField({ seatIndex: 0, key: "gender", value: true }),
            );
          }}
          className={`${styles.gender_item} ${sex === "female" ? styles.active : ""}`}>
          Ж
        </div>
      </div>
    </div>
  );
}
