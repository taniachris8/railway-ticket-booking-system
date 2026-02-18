import { FindTicketsForm } from "../components/FindTicketsForm";
import { HeroSection } from "../components/HeroSection";
import { ProgressWidget } from "../components/ProgressWidget";
import { Pagination } from "../components/Pagination";
import { FilterWidget } from "../components/FilterWidget";
import { LastTicketsWidget } from "../components/LastTicketsWidget";
import { TicketCard } from "../components/TicketCard";
import { FilterToolbar } from "../components/FilterToolbar";

export function TicketsPage() {
  return (
    <>
      <HeroSection
        image="/images/background2.png"
        containerClassName="hero__ticket-page">
        <FindTicketsForm
          containerClassName="find-tickets__tickets-container"
          inputsDivClassName="find-tickets__inputs__tickets-page"
        />
      </HeroSection>
      <ProgressWidget />
      <section className="tickets">
        <aside className="tickets__sidebar">
          <FilterWidget />
          <LastTicketsWidget />
        </aside>

        <main className="tickets__content">
          <FilterToolbar/>
          <ul className="tickets__list">
            <li className="tickets__item">
              <TicketCard />
            </li>
            <li className="tickets__item">
              <TicketCard />
            </li>
            <li className="tickets__item">
              <TicketCard />
            </li>
            <li className="tickets__item">
              <TicketCard />
            </li>
          </ul>

          <nav className="tickets__pagination">
            <Pagination />
          </nav>
        </main>
      </section>
    </>
  );
}
