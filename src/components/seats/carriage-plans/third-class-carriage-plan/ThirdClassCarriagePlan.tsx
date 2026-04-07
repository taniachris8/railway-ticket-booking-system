import type { SelectedSeat } from "../../../../state/reducers/seatsSlice";

import { CarriagePlanNumber } from "../carriage-plan-number/CarriagePlanNumber";
import { CarriageSeatNumber } from "../carriage-seat-number/CarriageSeatNumber";

export type ClassCarriagePlanProps = {
  isSeatAvailable: (seatNumber: number) => boolean;
  handleSelectSeat: (seatNumber: number) => void;
  selected: SelectedSeat[];
  carriageNumber: string;
};

export function ThirdClassCarriagePlan({
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
      const y = i % 2 === 0 ? 60 : 28;
      const available = isSeatAvailable(seatNumber);
       const isSelected = selected.some(
         (seat) => seat.seatNumber === seatNumber,
       );

      seats.push(
        <CarriageSeatNumber
          key={seatNumber}
          x={x}
          y={y}
          width={28}
          height={30}
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

  const drawSideSeats = () => {
    const sideSeats = [];
    const y = 112;
    let x = 135;

    for (let i = 33; i <= 48; i++) {
      const seatNumber = i;
      const available = isSeatAvailable(seatNumber);
      const isSelected = selected.some(
        (seat) => seat.seatNumber === seatNumber,
      );

      sideSeats.push(
        <CarriageSeatNumber
          key={seatNumber}
          x={x}
          y={y}
          width={45}
          height={25}
          seatNumber={seatNumber}
          available={available}
          isSelected={isSelected}
          handleSelectSeat={handleSelectSeat}
          textOffsetX={22.5}
          textOffsetY={12.5}
        />,
      );

      if ((i + 1) % 3 === 0) {
        x += 50;
      } else {
        x += 42;
      }
    }

    return sideSeats;
  };

  return (
    <>
      <svg width="921" height="145">
        <image href="images/third-class-plan.png" width="921" height="145" />
        <CarriagePlanNumber carriageNumber={carriageNumber} />
        {drawSeats()}
        {drawSideSeats()}
      </svg>
    </>
  );
}
