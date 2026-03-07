import styles from "./SeatsPage.module.css";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { LastTicketsWidget } from "../../components/tickets/lastTickets/last-tickets-widget/LastTicketsWidget";
import { FilterWidget } from "../../components/filter-widget/FilterWidget";
import { Loader } from "../../components/loader/Loader";
import { useEffect } from "react";
import { getSeatsRequired } from "../../state/reducers/seatsSlice";
import type { RootState } from "../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { SeatsTrain } from "../../components/seats/train/SeatsTrain";

// type SeatsPageProps = {};

export function SeatsPage() {
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.seats.status);
    const seatsData = useSelector((state: RootState) => state.seats.data);
    console.log("seatsData:", seatsData)

    useEffect(() => {
        dispatch(getSeatsRequired());
    }, [dispatch]);
    
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
              <FilterWidget />
              <LastTicketsWidget />
            </aside>

            <main className={styles.seats__content}>
              <h3 className={styles.seats__title}>Выбор мест</h3>
              {seatsData.map((data) => (
                  <SeatsTrain data={ data} direction="to" />
              ))}
              {/* <SeatsTrain direction="from" /> */}
            </main>
          </section>
        </>
      )}
    </>
  );
}
