import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../state/store";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { Loader } from "../../components/loader/Loader";
import styles from "./PassengersPage.module.css";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import { AsideWidget } from "../../components/passengers/aside-widget/AsideWidget";
import { Passenger } from "../../components/passengers/passenger/Passenger";

export function PassengersPage() {
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.passengers.status); 
  
  const numberOfPassengers = useSelector((state: RootState) => state.seats.departure.adultCount + state.seats.departure.childCount); 
  console.log("from passengers page", numberOfPassengers);


  const handleNavigateToPaymentClick = () => {
    navigate("/payment");
  }

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
              <AsideWidget/>
            </aside>

              <main className={styles.passengers__content}>
                { [...Array(numberOfPassengers)].map((_, index) => (
                  <Passenger key={index} passengerIndex={index} />
                ))}
              <Button
                className={styles.button}
                variant="more"
                text="Далее"
                onClick={handleNavigateToPaymentClick}
              />
            </main>
            {/* {showModal && (
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
            )} */}
          </section>
        </>
      )}
    </>
  );
}
