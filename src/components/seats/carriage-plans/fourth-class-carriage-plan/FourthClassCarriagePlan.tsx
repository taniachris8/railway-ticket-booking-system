import type { ClassCarriagePlanProps } from "../third-class-carriage-plan/ThirdClassCarriagePlan";

import { CarriagePlanNumber } from "../carriage-plan-number/CarriagePlanNumber";
import { CarriageSeatNumber } from "../carriage-seat-number/CarriageSeatNumber";

export function FourthClassCarriagePlan({
  isSeatAvailable,
  handleSelectSeat,
  selected,
  carriageNumber,
}: ClassCarriagePlanProps) {
  const drawLeftSideSeats = () => {
    const seats = [];
    let x = 147;

    for (let i = 0; i < 32; i++) {
      const seatNumber = i + 1;
      const y = i % 2 === 0 ? 55 : 34;
      const available = isSeatAvailable(seatNumber);
      const isSelected = selected.includes(seatNumber);

      seats.push(
        <CarriageSeatNumber
          key={seatNumber}
          x={x}
          y={y}
          width={24}
          height={18}
          seatNumber={seatNumber}
          available={available}
          isSelected={isSelected}
          handleSelectSeat={handleSelectSeat}
          textOffsetX={12}
          textOffsetY={9}
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
      <CarriageSeatNumber
        key={33}
        x={147}
        y={115}
        width={24}
        height={18}
        seatNumber={33}
        available={isSeatAvailable(33)}
        isSelected={selected.includes(33)}
        handleSelectSeat={handleSelectSeat}
        textOffsetX={12}
        textOffsetY={9}
      />,
    );

    let x = 190;

    for (let seatNumber = 34, i = 0; seatNumber <= 61; seatNumber++, i++) {
      const y = seatNumber % 2 === 0 ? 95 : 115;
      const available = isSeatAvailable(seatNumber);
      const isSelected = selected.includes(seatNumber);

      seats.push(
        <CarriageSeatNumber
          key={seatNumber}
          x={x}
          y={y}
          width={24}
          height={18}
          seatNumber={seatNumber}
          available={available}
          isSelected={isSelected}
          handleSelectSeat={handleSelectSeat}
          textOffsetX={12}
          textOffsetY={9}
        />,
      );

      if ((i + 1) % 4 === 0) {
        x += 43;
      } else if ((i + 1) % 2 === 0) {
        x += 45;
      }
    }

    seats.push(
      <CarriageSeatNumber
        key={62}
        x={806}
        y={115}
        width={24}
        height={18}
        seatNumber={62}
        available={isSeatAvailable(62)}
        isSelected={selected.includes(62)}
        handleSelectSeat={handleSelectSeat}
        textOffsetX={12}
        textOffsetY={9}
      />,
    );

    return seats;
  };

  return (
    <>
      <svg width="921" height="145">
        <image href="images\fourth-class-plan.png" width="921" height="145" />
        <CarriagePlanNumber carriageNumber={carriageNumber} />
        {drawLeftSideSeats()}
        {drawRightSideSeats()}
      </svg>
    </>
  );
}
