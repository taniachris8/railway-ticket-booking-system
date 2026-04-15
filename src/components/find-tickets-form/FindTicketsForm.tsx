import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import type { RootState } from "../../state/store";

import { DateInputsContainer } from "../date-inputs/date-inputs-container/DateInputsContainer";
import { DirectionInputs } from "../direction-inputs/direction-inputs/DirectionInputs";
import { Button } from "../button/Button";

import styles from "./FindTicketsForm.module.css";

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
  const departureDate = useSelector(
    (state: RootState) => state.filters.date_start,
  );
  const returnDate = useSelector((state: RootState) => state.filters.date_end);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const fromCityError = isSubmitted && !from_city;
  const toCityError = isSubmitted && !to_city;
  const departureDateError =
    isSubmitted && !departureDate && Boolean(returnDate);

  const handleFindTickets = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasFromCityError = !from_city;
    const hasToCityError = !to_city;
    const hasDepartureDateError = !departureDate && Boolean(returnDate);

    setIsSubmitted(true);

    if (hasFromCityError || hasToCityError || hasDepartureDateError) {
      return;
    }

    navigate("/tickets");
  };

  return (
    <div className={`${styles.find__tickets} ${containerClassName}`}>
      <form className={styles.find__tickets_form} onSubmit={handleFindTickets}>
        <div className={inputsDivClassName}>
          <DirectionInputs
            visibleFromCityTooltip={fromCityError}
            visibleToCityTooltip={toCityError}
          />
          <DateInputsContainer
            visibleDepartureDateTooltip={departureDateError}
          />
        </div>
        <Button variant="find" text="Найти билеты" />
      </form>
    </div>
  );
}
