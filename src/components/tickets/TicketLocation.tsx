import "./TicketLocation.css";

type TicketLocationProps = {
  children?: React.ReactNode;
  city: string;
  station: string;
  containerClassName: string;
  cityClassName: string;
  stationClassName: string;
};

export function TicketLocation({
  children,
  city,
  station,
  containerClassName,
  cityClassName,
  stationClassName,
}: TicketLocationProps) {
  return (
    <>
      <div className={`ticket-location ${containerClassName}`}>
        {children}
        <p className={cityClassName}>{city}</p>
        <p className={stationClassName}>{station}</p>
      </div>
    </>
  );
}
