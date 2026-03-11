import type { ClassCarriagePlanProps } from "./ThirdClassCarriagePlan";

export function FirstClassCarriagePlan({
  isSeatAvailable,
  handleSelectSeat,
  selected,
}: ClassCarriagePlanProps) {
  const drawSeats = () => {
    const seats = [];
    let x = 130;

    for (let i = 0; i < 16; i++) {
      const seatNumber = i + 1;
      const available = isSeatAvailable(seatNumber);
      const y = 60;

      seats.push(
        <rect
          key={seatNumber}
          x={x}
          y={y}
          width="30"
          height="30"
          stroke="none"
          fill="transparent"
          style={{
            cursor: available ? "pointer" : "not-allowed",
            outline: selected === seatNumber ? "2px solid #FFA800" : "none",
          }}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
        />,
      );

      if (i % 2 === 0) {
        x += 60;
      } else {
        x += 30;
      }
    }

    return seats;
  };

  return (
    <>
      <svg width="921" height="145">
        <image href="images/first-class-plan.png" width="921" height="145" />
        {drawSeats()}
      </svg>
    </>
  );
}
