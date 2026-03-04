import styles from "./FindTicketsForm.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DateInputs } from "../../date-inputs/DateInputs";
import { DirectionInputs } from "../../direction-inputs/direction-inputs/DirectionInputs";
import { Button } from "../../buttons/Button";
import type { RootState } from "../../../state/store";

type FindTicketsFormProps = {
  containerClassName: string;
  inputsDivClassName: string;
};

export function FindTicketsForm({
  containerClassName,
  inputsDivClassName,
}: FindTicketsFormProps) {
  const navigate = useNavigate();
  const from_city = useSelector((state: RootState) => state.tickets.from_city);
  const to_city = useSelector((state: RootState) => state.tickets.to_city);

  const handleFindTickets = () => {
    if (!from_city && !to_city) {
      alert("Пожалуйста, выберите направление");
      return;
    }
    navigate("/tickets");
  };

  return (
    <>
      <div className={`${styles.find__tickets} ${containerClassName}`}>
        <form action="" className={styles.find__tickets_form}>
          <div className={inputsDivClassName}>
            <DirectionInputs />
            <DateInputs />
          </div>
          <Button
            variant="find"
            text="Найти билеты"
            onClick={handleFindTickets}
          />
        </form>
      </div>
    </>
  );
}
