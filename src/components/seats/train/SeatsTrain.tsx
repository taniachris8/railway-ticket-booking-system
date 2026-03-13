import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ToIcon } from "../../../icons/ToIcon";
import { Button } from "../../button/Button";
import { CarriageType } from "../carriage-type/CarriageType";
import { TicketsQuantity } from "../quantity/tickets-quantity/TicketsQuantity";
import { TrainInfo } from "../train-info/TrainInfo";
import styles from "./SeatsTrain.module.css";
import { resetTrainState } from "../../../state/reducers/seatsSlice";

type SeatsTrainProps = {
  direction: "departure" | "arrival";
};

export function SeatsTrain({ direction }: SeatsTrainProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChoseAnotherTrain = () => {
    dispatch(resetTrainState("arrival"));
    dispatch(resetTrainState("departure"));
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
        <TicketsQuantity direction={direction} />
        <CarriageType direction={direction} />
      </section>
    </>
  );
}
