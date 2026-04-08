import { useState, useEffect } from "react";
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

  const [visibleFromCityTooltip, setVisibleFromCityTooltip] = useState(false);
  const [visibleToCityTooltip, setVisibleToCityTooltip] = useState(false);

  const [visibleDepartureDateTooltip, setVisibleDepartureDateTooltip] =
    useState(false);

  const handleFindTickets = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!departureDate && returnDate) {
      setVisibleDepartureDateTooltip(true);
      return;
    }

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
    if (departureDate) {
      setVisibleDepartureDateTooltip(false);
    }
    if (!returnDate && !departureDate) {
      setVisibleDepartureDateTooltip(false);
    }

    if (from_city) {
      setVisibleFromCityTooltip(false);
    }
    if (to_city) {
      setVisibleToCityTooltip(false);
    }
  }, [departureDate, returnDate, from_city, to_city]);

  return (
    <>
      <div className={`${styles.find__tickets} ${containerClassName}`}>
        <form
          action=""
          className={styles.find__tickets_form}
          onSubmit={handleFindTickets}>
          <div className={inputsDivClassName}>
            <DirectionInputs
              visibleFromCityTooltip={visibleFromCityTooltip}
              visibleToCityTooltip={visibleToCityTooltip}
            />
            <DateInputsContainer
              visibleDepartureDateTooltip={visibleDepartureDateTooltip}
            />
          </div>
          <Button variant="find" text="Найти билеты" />
        </form>
      </div>
    </>
  );
}
