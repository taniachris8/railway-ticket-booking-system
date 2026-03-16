import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import type { RootState } from "../../state/store";

import { getSeatsRequired } from "../../state/reducers/seatsSlice";
import { selectSelectedSeats } from "../../state/selectors/seatSelectors";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { LastTicketsWidget } from "../../components/tickets/lastTickets/last-tickets-widget/LastTicketsWidget";
import { FilterWidget } from "../../components/filter-widget/FilterWidget";
import { Loader } from "../../components/loader/Loader";
import { SeatsTrain } from "../../components/seats/seats-train/SeatsTrain";
import { Button } from "../../components/button/Button";
import { Module } from "../../components/module/Module";

import styles from "./SeatsPage.module.css";

export function SeatsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state: RootState) => state.seats.status);
  const departureTrain = useSelector(
    (state: RootState) => state.seats.departureTrain,
  );
  const arrivalTrain = useSelector(
    (state: RootState) => state.seats.arrivalTrain,
  );

  useEffect(() => {
    if (departureTrain?._id) {
      dispatch(getSeatsRequired());
    }
  }, [dispatch, departureTrain?._id]);

  const departureSelectedSeats = useSelector((state: RootState) =>
    selectSelectedSeats(state, "departure"),
  );
  const arrivalSelectedSeats = useSelector((state: RootState) =>
    selectSelectedSeats(state, "arrival"),
  );

  const [showModal, setShowModal] = useState(false);

  const handleNavigateToPassengersClick = () => {
    const hasDepartureSeats = Object.values(departureSelectedSeats).some(
      (seats) => seats.length > 0,
    );
    const hasArrivalSeats = Object.values(arrivalSelectedSeats).some(
      (seats) => seats.length > 0,
    );

    if (!hasDepartureSeats && !hasArrivalSeats) {
      setShowModal(true);
      return;
    }
    navigate("/passengers");
  };

  return (
    <>
      <HeroSection
        image="/images/background2.png"
        containerClassName={styles.hero__seats_page}>
        <FindTicketsForm
          containerClassName={styles.find_tickets__seats_container}
          inputsDivClassName={styles.find_tickets__inputs__seats_page}
        />
      </HeroSection>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <ProgressWidget stage="tickets-page" />
          <section className={styles.seats}>
            <aside className={styles.seats__sidebar}>
              <FilterWidget filterType="seatsFilters" />
              <LastTicketsWidget />
            </aside>

            <main
              key={`${departureTrain?._id}-${arrivalTrain?._id}`}
              className={styles.seats__content}
              id="seats-content">
              <h3 className={styles.seats__title}>Выбор мест</h3>
              {departureTrain && <SeatsTrain direction="departure" />}
              {arrivalTrain && <SeatsTrain direction="arrival" />}
              <Button
                className={styles.button}
                variant="more"
                text="Далее"
                onClick={handleNavigateToPassengersClick}
              />
            </main>
            {showModal && (
              <Module
                type="info"
                message="Пожалуйста, выберите хотя бы одно место"
                onClick={() => setShowModal(false)}
              />
            )}
          </section>
        </>
      )}
    </>
  );
}
