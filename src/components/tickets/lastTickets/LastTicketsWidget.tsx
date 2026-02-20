import "./LastTickets.css";
import { LastTicketCard } from "./LastTicketCard";

export function LastTicketsWidget() {
  return (
    <>
      <section className="last-tickets">
        <h3 className="last-tickets__title">последние билеты</h3>
        <div className="last-tickets__list">
          <LastTicketCard />
          <LastTicketCard />
          <LastTicketCard />
        </div>
      </section>
    </>
  );
}
