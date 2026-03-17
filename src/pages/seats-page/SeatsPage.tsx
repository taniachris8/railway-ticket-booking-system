import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import type { RootState } from "../../state/store";

import { getSeatsRequired } from "../../state/reducers/seatsSlice";
import { selectSelectedSeats } from "../../state/selectors/seatSelectors";

import { setSeatsFiltersField } from "../../state/reducers/filterSeatsSlice";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { LastTicketsWidget } from "../../components/tickets/lastTickets/last-tickets-widget/LastTicketsWidget";
import { FilterWidget } from "../../components/filter-widget/FilterWidget";
import { Loader } from "../../components/loader/Loader";
import { SeatsTrain } from "../../components/seats/seats-train/SeatsTrain";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

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

  const { have_wifi, have_air_conditioning, have_express } = useSelector(
    (state: RootState) => state.seatsFilters,
  );

  const seatsData = useSelector((state: RootState) => state.seats.data);
  const [showTypeModal, setShowTypeModal] = useState(false);

  const instantFilters = useMemo(
    () => ({
      have_wifi,
      have_air_conditioning,
      have_express,
    }),
    [have_wifi, have_air_conditioning, have_express],
  );

  const preparedFilters = useMemo(
    () => ({
      ...instantFilters,
    }),
    [instantFilters],
  );

  useEffect(() => {
    if (departureTrain?._id) {
      dispatch(getSeatsRequired());
    }
  }, [dispatch, preparedFilters, departureTrain?._id]);

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

  const handleCarriageTypeChange = (
    id: "first" | "second" | "third" | "fourth",
  ) => {
    dispatch(setSeatsFiltersField({ key: "have_first_class", value: false }));
    dispatch(setSeatsFiltersField({ key: "have_second_class", value: false }));
    dispatch(setSeatsFiltersField({ key: "have_third_class", value: false }));
    dispatch(setSeatsFiltersField({ key: "have_fourth_class", value: false }));

    const keyMap = {
      first: "have_first_class",
      second: "have_second_class",
      third: "have_third_class",
      fourth: "have_fourth_class",
    } as const;

    const hasCarriage = seatsData.some((data) => data.coach.class_type === id);

    if (!hasCarriage) {
      setShowTypeModal(true);
      return;
    }

    dispatch(setSeatsFiltersField({ key: keyMap[id], value: true }));
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
              <FilterWidget
                filterType="seatsFilters"
                handleCarriageTypeChange={handleCarriageTypeChange}
              />
              <LastTicketsWidget />
            </aside>

            <main
              key={`${departureTrain?._id}-${arrivalTrain?._id}`}
              className={styles.seats__content}
              id="seats-content">
              <h3 className={styles.seats__title}>Выбор мест</h3>
              {departureTrain && (
                <SeatsTrain
                  handleCarriageTypeChange={handleCarriageTypeChange}
                  direction="departure"
                />
              )}
              {arrivalTrain && (
                <SeatsTrain
                  handleCarriageTypeChange={handleCarriageTypeChange}
                  direction="arrival"
                />
              )}
              <Button
                className={styles.button}
                variant="more"
                text="Далее"
                onClick={handleNavigateToPassengersClick}
              />
            </main>
            {showModal && (
              <Modal
                type="info"
                message="Пожалуйста, выберите хотя бы одно место"
                onClick={() => setShowModal(false)}
              />
            )}
            {showTypeModal && (
              <Modal
                type="info"
                message="Выбранный тип вагона недоступен для данного поезда"
                onClick={() => setShowTypeModal(false)}
              />
            )}
          </section>
        </>
      )}
    </>
  );
}
