import type { ClassCarriagePlanProps } from "./ThirdClassCarriagePlan";

export function SecondClassCarriagePlan({
  isSeatAvailable,
  handleSelectSeat,
  selected,
}: ClassCarriagePlanProps) {
  const drawSeats = () => {
    const seats = [];
    let x = 130;

    for (let i = 0; i < 32; i++) {
      const seatNumber = i + 1;
      const available = isSeatAvailable(seatNumber);
      const y = i % 2 === 0 ? 60 : 30;

      seats.push(
        <rect
          key={seatNumber}
          x={x}
          y={y}
          width="30"
          height="30"
          fill="transparent"
          stroke="none"
          style={{
            cursor: available ? "pointer" : "not-allowed",
            outline: selected === seatNumber ? "2px solid #FFA800" : "none",
          }}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
        />,
      );

      if ((i + 1) % 4 === 0) {
        x += 30;
      } else if ((i + 1) % 2 === 0) {
        x += 60;
      }
    }

    return seats;
  };

  return (
    <>
      <svg width="921" height="145">
        <image href="images/second-class-plan.png" width="921" height="145" />
        {drawSeats()}
      </svg>
    </>
  );
}
