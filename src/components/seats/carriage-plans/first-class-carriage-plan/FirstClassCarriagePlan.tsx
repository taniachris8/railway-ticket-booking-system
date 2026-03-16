import type { ClassCarriagePlanProps } from "../third-class-carriage-plan/ThirdClassCarriagePlan";

import { CarriagePlanNumber } from "../carriage-plan-number/CarriagePlanNumber";
import { CarriageSeatNumber } from "../carriage-seat-number/CarriageSeatNumber";

export function FirstClassCarriagePlan({
  isSeatAvailable,
  handleSelectSeat,
  selected,
  carriageNumber,
}: ClassCarriagePlanProps) {
  const drawSeats = () => {
    const seats = [];
    let x = 130;

    for (let i = 0; i < 16; i++) {
      const seatNumber = i + 1;
      const available = isSeatAvailable(seatNumber);
      const isSelected = selected.includes(seatNumber);
      const y = 60;

      seats.push(
        <CarriageSeatNumber
          key={seatNumber}
          x={x}
          y={y}
          width={30}
          height={30}
          seatNumber={seatNumber}
          available={available}
          isSelected={isSelected}
          handleSelectSeat={handleSelectSeat}
          textOffsetX={15}
          textOffsetY={15}
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
        <CarriagePlanNumber carriageNumber={carriageNumber} />
        {drawSeats()}
      </svg>
    </>
  );
}
