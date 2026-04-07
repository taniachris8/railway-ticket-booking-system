import type { ClassCarriagePlanProps } from "../third-class-carriage-plan/ThirdClassCarriagePlan";

import { CarriagePlanNumber } from "../carriage-plan-number/CarriagePlanNumber";
import { CarriageSeatNumber } from "../carriage-seat-number/CarriageSeatNumber";

export function SecondClassCarriagePlan({
  isSeatAvailable,
  handleSelectSeat,
  selected,
  carriageNumber,
}: ClassCarriagePlanProps) {
  const drawSeats = () => {
    const seats = [];
    let x = 130;

    for (let i = 0; i < 32; i++) {
      const seatNumber = i + 1;
      const available = isSeatAvailable(seatNumber);
       const isSelected = selected.some(
         (seat) => seat.seatNumber === seatNumber,
       );
      const y = i % 2 === 0 ? 58 : 28;

      seats.push(
        <CarriageSeatNumber
          key={seatNumber}
          x={x}
          y={y}
          width={29}
          height={28}
          seatNumber={seatNumber}
          available={available}
          isSelected={isSelected}
          handleSelectSeat={handleSelectSeat}
          textOffsetX={15}
          textOffsetY={15}
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
        <CarriagePlanNumber carriageNumber={carriageNumber} />
        {drawSeats()}
      </svg>
    </>
  );
}
