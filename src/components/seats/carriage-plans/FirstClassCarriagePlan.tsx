import type { ClassCarriagePlanProps } from "./ThirdClassCarriagePlan";

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
        <g
          key={seatNumber}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
          style={{
            cursor: available ? "pointer" : "not-allowed",
          }}>
          <rect
            x={x}
            y={y}
            width="30"
            height="30"
            fill={available ? "#E5E5E5" : "#777"}
            stroke={isSelected ? "#FFA800" : "none"}
            strokeWidth={isSelected ? 2 : 0}
          />

          <text
            x={x + 15}
            y={y + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill={available ? "black" : "#ccc"}
            pointerEvents="none">
            {seatNumber}
          </text>
        </g>,
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
        <g>
          <rect x={40} y={-1} width="35" height="26" fill="black" />
          <text
            x={40 + 35 / 2}
            y={-1 + 26 / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="12">
            {carriageNumber}
          </text>
        </g>
        {drawSeats()}
      </svg>
    </>
  );
}
