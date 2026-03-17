import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { resetTrainState } from "../../../state/reducers/seatsSlice";

import { Button } from "../../button/Button";
import { CarriageType } from "../carriage-type/CarriageType";
import { TicketsQuantity } from "../quantity/tickets-quantity/TicketsQuantity";
import { TrainInfo } from "../train-info/TrainInfo";

import { ToIcon } from "../../../icons/ToIcon";

import styles from "./SeatsTrain.module.css";

type SeatsTrainProps = {
  direction: "departure" | "arrival";
  handleCarriageTypeChange: (id: "first" | "second" | "third" | "fourth") => void;
};

export function SeatsTrain({ direction, handleCarriageTypeChange }: SeatsTrainProps) {
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
        <CarriageType direction={direction} handleCarriageTypeChange={handleCarriageTypeChange} />
      </section>
    </>
  );
}
