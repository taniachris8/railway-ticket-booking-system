import "./TicketLocation.css";

type TicketLocationProps = {
  locationClassName: string;
  city: string;
  station: string;
  multiline?: boolean;
};

export function TicketLocation({
  city,
  station,
  locationClassName,
  multiline,
}: TicketLocationProps) {
  return (
    <>
      <div className={`ticket-location ${locationClassName}`}>
        {/* <time className="ticket__direction-time">00:10</time> */}
        <p className="location__city">{city}</p>
        <p
          className="location__station"
          style={{ whiteSpace: multiline ? "pre-line" : "normal" }}>
          {station}
        </p>
      </div>
    </>
  );
}
