import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

import type { RootState } from "../../state/store";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { Loader } from "../../components/loader/Loader";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import { AsideWidget } from "../../components/passengers/aside-widget/AsideWidget";
import { Passenger } from "../../components/passengers/passenger/Passenger";

import styles from "./PassengersPage.module.css";

export function PassengersPage() {
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.passengers.status);

  const [openedPassengerIndex, setOpenedPassengerIndex] = useState<
    number | null
  >(null);

  const seatsFromPassengersState = useSelector(
    (state: RootState) => state.passengers.departure.seats,
  );

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");

  const handleNavigateToPaymentClick = () => {
    if (
      seatsFromPassengersState.every(
        (seat) =>
          seat.person_info.first_name &&
          seat.person_info.last_name &&
          seat.person_info.patronymic &&
          seat.person_info.document_data,
      )
    ) {
      navigate("/payment");
    } else {
      setInfoModalMessage("Пожалуйста, заполните информацию о всех пассажирах");
      setShowInfoModal(true);
    }
  };

  return (
    <>
      <HeroSection
        image="/images/background2.png"
        containerClassName={styles.hero__passengers_page}>
        <FindTicketsForm
          containerClassName={styles.find_tickets__passengers_container}
          inputsDivClassName={styles.find_tickets__inputs__passengers_page}
        />
      </HeroSection>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <ProgressWidget stage="passengers-page" />
          <section className={styles.passengers}>
            <aside className={styles.passengers__sidebar}>
              <AsideWidget />
            </aside>

            <main className={styles.passengers__content}>
              {seatsFromPassengersState.map((seat, index) => (
                <Passenger
                  key={seat.coach_id + seat.seat_number}
                  passengerIndex={index}
                  openedPassengerIndex={openedPassengerIndex}
                  setOpenedPassengerIndex={setOpenedPassengerIndex}
                />
              ))}
              <Button
                className={styles.button}
                variant="more"
                text="Далее"
                onClick={handleNavigateToPaymentClick}
              />
            </main>
            {showInfoModal && (
              <Modal
                type="info"
                message={infoModalMessage}
                onClick={() => setShowInfoModal(false)}
              />
            )}
          </section>
        </>
      )}
    </>
  );
}
