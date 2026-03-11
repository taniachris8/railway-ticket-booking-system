import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToIcon } from "../../../icons/ToIcon";
import { Button } from "../../buttons/Button";
import { CarriageType } from "../carriage-type/CarriageType";
import { TicketsQuantity } from "../quantity/TicketsQuantity";
import { TrainInfo } from "../train-info/TrainInfo";
import styles from "./SeatsTrain.module.css";
import type { RootState } from "../../../state/store";

type SeatsTrainProps = {
  direction: string;
};

export function SeatsTrain({ direction }: SeatsTrainProps) {
  const seatsData = useSelector((state: RootState) => state.seats.data);
  const navigate = useNavigate();

  const handleChoseAnotherTrain = () => {
    navigate("/tickets");
  };

  return (
    <>
      <section className={styles.train}>
        <div
          className={`${styles.train__header} ${styles[`train__header_${direction}`]}`}>
          <ToIcon className={styles.arrow__icon} />
          <Button
            onClick={handleChoseAnotherTrain}
            variant="change-train"
            text="Выбрать другой поезд"
          />
        </div>
        <TrainInfo direction={direction} />
        <TicketsQuantity />
        {seatsData.map((data, index) => (
          <CarriageType key={index} data ={data}/>
        ))}
      </section>
    </>
  );
}
