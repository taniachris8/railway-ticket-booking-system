import styles from "./Carriage.module.css";
import { CarriageTable } from "../carriage-table/CarriageTable";
import { CarriagePlan } from "../carriage-plan/CarriagePlan";
import type { SeatsInfoType } from "../../../types";
import { formatCarriageName } from "../../../utils/formatCarriageName";

type CarriageProps = {
    data: SeatsInfoType;
};

export function Carriage({ data }: CarriageProps) {
    const { class_type} = data.coach;
    
  console.log("from carriage:", data);
  return (
    <>
      <div
        className={styles.carriage__content}>
        <div className={styles.carriage__content_header}>
          <div className={styles.carriages}>
            <p className={styles.carriage__content_text}>Вагоны</p>
            <span className={styles.carriage__number_active}>07</span>
            <span className={styles.carriage__number}>09</span>
          </div>
          <p className={styles.carriage__content_text}>
            Нумерация вагонов начинается с головы поезда
          </p>
        </div>
        <div className={styles.carriage__details}>
          <div className={styles.carriage__details_number}>
            <p>{formatCarriageName(data.coach.name)}</p>
            <span>вагон</span>
          </div>
          <CarriageTable data={data} />
        </div>
        <CarriagePlan availableSeats={data.seats} classType={class_type} />
      </div>
    </>
  );
}
