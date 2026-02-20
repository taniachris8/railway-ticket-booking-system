import "./TicketsPage.css";
import { FindTicketsForm } from "../../components/hero-section/FindTicketsForm";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { Pagination } from "../../components/pagination/Pagination";
import { FilterWidget } from "../../components/filter-widget/FilterWidget";
import { LastTicketsWidget } from "../../components/tickets/lastTickets/LastTicketsWidget";
import { TicketCard } from "../../components/tickets/TicketCard";
import { FilterToolbar } from "../../components/filter-toolbar/FilterToolbar";

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
          <FilterToolbar />
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
