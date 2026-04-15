import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../state/store";

import { clearTicketsError } from "../../state/reducers/ticketsSlice";
import { getTicketsRequired } from "../../state/reducers/ticketsSlice";

import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { Pagination } from "../../components/pagination/Pagination";
import { FilterWidget } from "../../components/filter-widget/FilterWidget";
import { LastTicketsWidget } from "../../components/tickets/lastTickets/last-tickets-widget/LastTicketsWidget";
import { TicketCard } from "../../components/tickets/ticket-card/TicketCard";
import { FilterToolbar } from "../../components/filter-toolbar/FilterToolbar";
import { Loader } from "../../components/loader/Loader";
import { Modal } from "../../components/modal/Modal";

import styles from "./TicketsPage.module.css";

export function TicketsPage() {
  const dispatch = useDispatch();

  const tickets = useSelector((state: RootState) => state.tickets.data);
  console.log("from tickets page", tickets)
  const status = useSelector((state: RootState) => state.tickets.status);
  
  const error = useSelector((state: RootState) => state.tickets.error);


  const {
    from_city_id,
    to_city_id,
    date_start,
    date_end,
    date_start_arrival,
    date_end_arrival,
    limit,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_air_conditioning,
    have_express,
    price_from,
    price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
    offset,
    sort,
  } = useSelector((state: RootState) => state.filters);

  const instantFilters = useMemo(
    () => ({
      from_city_id,
      to_city_id,
      date_start,
      date_end,
      date_start_arrival,
      date_end_arrival,
      limit,
      have_first_class,
      have_second_class,
      have_third_class,
      have_fourth_class,
      have_wifi,
      have_air_conditioning,
      have_express,
      offset,
      sort,
    }),
    [
      from_city_id,
      to_city_id,
      date_start,
      date_end,
      date_start_arrival,
      date_end_arrival,
      limit,
      have_first_class,
      have_second_class,
      have_third_class,
      have_fourth_class,
      have_wifi,
      have_air_conditioning,
      have_express,
      offset,
      sort,
    ],
  );

  const sliderFilters = useMemo(
    () => ({
      price_from,
      price_to,
      start_departure_hour_from,
      start_departure_hour_to,
      start_arrival_hour_from,
      start_arrival_hour_to,
      end_departure_hour_from,
      end_departure_hour_to,
      end_arrival_hour_from,
      end_arrival_hour_to,
    }),
    [
      price_from,
      price_to,
      start_departure_hour_from,
      start_departure_hour_to,
      start_arrival_hour_from,
      start_arrival_hour_to,
      end_departure_hour_from,
      end_departure_hour_to,
      end_arrival_hour_from,
      end_arrival_hour_to,
    ],
  );

  const [debouncedSliders, setDebouncedSliders] = useState(sliderFilters);

  const preparedFilters = useMemo(
    () => ({
      ...instantFilters,
      ...debouncedSliders,
    }),
    [instantFilters, debouncedSliders],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSliders(sliderFilters);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sliderFilters]);

  useEffect(() => {
    const isValidDates = date_start || (!date_start && !date_end); 
    
    if (
      preparedFilters.from_city_id &&
      preparedFilters.to_city_id &&
      isValidDates
    ) {
      dispatch(getTicketsRequired());
    }
  }, [dispatch, preparedFilters]);

  return (
    <>
      <HeroSection
        image="/images/background2.png"
        containerClassName={styles.hero__ticket_page}>
        <FindTicketsForm
          containerClassName={styles.find_tickets__tickets_container}
          inputsDivClassName={styles.find_tickets__inputs__tickets_page}
        />
      </HeroSection>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <ProgressWidget stage="tickets-page" />
          <section className={styles.tickets}>
            <aside className={styles.tickets__sidebar}>
              <FilterWidget filterType="filters" />
              <LastTicketsWidget />
            </aside>

            <main className={styles.tickets__content}>
              <FilterToolbar totalCount={tickets?.total_count} />
              <ul className={styles.tickets__list}>
                {tickets.items?.map((ticket, index) => (
                  <li key={index} className={styles.tickets__item}>
                    <TicketCard ticket={ticket} />
                  </li>
                ))}
              </ul>

              <nav className={styles.tickets__pagination}>
                <Pagination totalCount={tickets?.total_count} />
              </nav>
            </main>
          </section>
          {error && (
            <Modal
              type="error"
              message="Не удалось найти билеты. Проверьте настройки подключения к Интернету или попробуйте позже."
              onClick={() => dispatch(clearTicketsError())}></Modal>
          )}
        </>
      )}
    </>
  );
}
