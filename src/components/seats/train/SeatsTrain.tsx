import { ToIcon } from "../../../icons/ToIcon";
import type { SeatsInfoType } from "../../../types";
import { Button } from "../../buttons/Button";
import { TrainInfo } from "../train-info/TrainInfo";
import styles from "./SeatsTrain.module.css";

type SeatsTrainProps = {
  direction: string;
  data: SeatsInfoType[];
}

export function SeatsTrain({ direction, data }: SeatsTrainProps) {
  const { name } = data;
  
  return (
    <>
      <section className={styles.train}>
        <div className={`${styles.train__header} ${styles[`train__header_${direction}`]}`}>
          <ToIcon className={styles.arrow__icon} />
          <Button variant="change-train" text="Выбрать другой поезд" />
        </div>
       <TrainInfo direction={direction} />
        <div className={styles.train__tickets_quantity}> </div>
        <div className={styles.carriage__type}> </div>
      </section>
    </>
  );
}
