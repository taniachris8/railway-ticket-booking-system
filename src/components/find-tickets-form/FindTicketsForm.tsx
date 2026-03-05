import styles from "./FindTicketsForm.module.css";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DateInputs } from "../date-inputs/DateInputs";
import { DirectionInputs } from "../direction-inputs/direction-inputs/DirectionInputs";
import { Button } from "../buttons/Button";
import type { RootState } from "../../state/store";

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

  const [visibleFromCityTooltip, setVisibleFromCityTooltip] = useState(false);
  const [visibleToCityTooltip, setVisibleToCityTooltip] = useState(false);

  const handleFindTickets = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!from_city) {
      setVisibleFromCityTooltip(true);
      return;
    }
    if (!to_city) {
      setVisibleToCityTooltip(true);
      return;
    }
    navigate("/tickets");
  };

  useEffect(() => {
    if (from_city) {
      setVisibleFromCityTooltip(false);
    }
    if (to_city) { 
      setVisibleToCityTooltip(false);
    }
  }, [from_city, to_city]);

  return (
    <>
      <div className={`${styles.find__tickets} ${containerClassName}`}>
        <form
          action=""
          className={styles.find__tickets_form}
          onSubmit={handleFindTickets}>
          <div className={inputsDivClassName}>
            <DirectionInputs visibleFromCityTooltip={visibleFromCityTooltip} visibleToCityTooltip={visibleToCityTooltip} />
            <DateInputs />
          </div>
          <Button variant="find" text="Найти билеты" />
        </form>
      </div>
    </>
  );
}
