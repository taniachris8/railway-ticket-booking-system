import type { ClassCarriagePlanProps } from "./ThirdClassCarriagePlan";

export function FourthClassCarriagePlan({
  isSeatAvailable,
  handleSelectSeat,
  selected,
}: ClassCarriagePlanProps) {
  const drawLeftSideSeats = () => {
    const seats = [];
    let x = 147;

    for (let i = 0; i < 32; i++) {
      const seatNumber = i + 1;
      const y = i % 2 === 0 ? 55 : 34;
      const available = isSeatAvailable(seatNumber);

      seats.push(
        <rect
          key={seatNumber}
          x={x}
          y={y}
          width="24"
          height="18"
          stroke="none"
          fill="transparent"
          style={{
            cursor: available ? "pointer" : "not-allowed",
            outline: selected === seatNumber ? "2px solid #FFA800" : "none",
          }}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
        />,
      );

      if ((i + 1) % 4 === 0) {
        x += 43;
      } else if ((i + 1) % 2 === 0) {
        x += 45;
      }
    }

    return seats;
  };

  const drawRightSideSeats = () => {
    const seats = [];

    seats.push(
      <rect
        key={33}
        x={147}
        y={115}
        width="24"
        height="18"
        stroke="none"
        fill="transparent"
        style={{
          cursor: isSeatAvailable(33) ? "pointer" : "not-allowed",
          outline: selected === 33 ? "2px solid #FFA800" : "none",
        }}
        onClick={isSeatAvailable(33) ? () => handleSelectSeat(33) : undefined}
      />,
    );

    let x = 190;

    for (let seatNumber = 34, i = 0; seatNumber <= 60; seatNumber++, i++) {
      const y = seatNumber % 2 === 0 ? 95 : 115;
      const available = isSeatAvailable(seatNumber);

      seats.push(
        <rect
          key={seatNumber}
          x={x}
          y={y}
          width="24"
          height="18"
          stroke="none"
          fill="transparent"
          style={{
            cursor: available ? "pointer" : "not-allowed",
            outline: selected === seatNumber ? "2px solid #FFA800" : "none",
          }}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
        />,
      );

      if ((i + 1) % 4 === 0) {
        x += 43;
      } else if ((i + 1) % 2 === 0) {
        x += 45;
      }
    }

    seats.push(
      <rect
        key={62}
        x={806}
        y={115}
        width="24"
        height="18"
        stroke="none"
        fill="transparent"
        style={{
          cursor: isSeatAvailable(62) ? "pointer" : "not-allowed",
          outline: selected === 62 ? "2px solid #FFA800" : "none",
        }}
        onClick={isSeatAvailable(62) ? () => handleSelectSeat(62) : undefined}
      />,
    );

    return seats;
  };

  return (
    <>
      <svg width="921" height="145">
        <image href="images\fourth-class-plan.png" width="921" height="145" />
        {drawLeftSideSeats()}
        {drawRightSideSeats()}
      </svg>
    </>
  );
}
