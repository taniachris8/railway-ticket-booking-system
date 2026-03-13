import type { ClassCarriagePlanProps } from "./ThirdClassCarriagePlan";

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
        <g
          key={seatNumber}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
          style={{ cursor: available ? "pointer" : "not-allowed" }}>
          <rect
            x={x}
            y={y}
            width="24"
            height="18"
            fill={available ? "#E5E5E5" : "#777"}
            stroke={isSelected ? "#FFA800" : "none"}
            strokeWidth={isSelected ? 2 : 0}
          />

          <text
            x={x + 12}
            y={y + 9}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill={available ? "black" : "#ccc"}
            pointerEvents="none">
            {seatNumber}
          </text>
        </g>,
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
      <g
        key={33}
        onClick={isSeatAvailable(33) ? () => handleSelectSeat(33) : undefined}
        style={{ cursor: isSeatAvailable(33) ? "pointer" : "not-allowed" }}>
        <rect
          x={147}
          y={115}
          width="24"
          height="18"
          fill={isSeatAvailable(33) ? "#E5E5E5" : "#777"}
          stroke={selected.includes(33) ? "#FFA800" : "none"}
          strokeWidth={selected.includes(33) ? 2 : 0}
        />

        <text
          x={147 + 12}
          y={115 + 9}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fill={isSeatAvailable(33) ? "black" : "#ccc"}
          pointerEvents="none">
          33
        </text>
      </g>,
    );

    let x = 190;

    for (let seatNumber = 34, i = 0; seatNumber <= 61; seatNumber++, i++) {
      const y = seatNumber % 2 === 0 ? 95 : 115;
      const available = isSeatAvailable(seatNumber);
       const isSelected = selected.includes(seatNumber);

      seats.push(
        <g
          key={seatNumber}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
          style={{ cursor: available ? "pointer" : "not-allowed" }}>
          <rect
            x={x}
            y={y}
            width="24"
            height="18"
            fill={available ? "#E5E5E5" : "#777"}
            stroke={isSelected ? "#FFA800" : "none"}
            strokeWidth={isSelected ? 2 : 0}
          />

          <text
            x={x + 12}
            y={y + 9}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill={available ? "black" : "#ccc"}
            pointerEvents="none">
            {seatNumber}
          </text>
        </g>,
      );

      if ((i + 1) % 4 === 0) {
        x += 43;
      } else if ((i + 1) % 2 === 0) {
        x += 45;
      }
    }

    seats.push(
      <g
        key={62}
        onClick={isSeatAvailable(62) ? () => handleSelectSeat(62) : undefined}
        style={{ cursor: isSeatAvailable(62) ? "pointer" : "not-allowed" }}>
        <rect
          x={806}
          y={115}
          width="24"
          height="18"
          fill={isSeatAvailable(62) ? "#E5E5E5" : "#777"}
          stroke={selected.includes(62) ? "#FFA800" : "none"}
          strokeWidth={selected.includes(62) ? 2 : 0}
        />

        <text
          x={806 + 12}
          y={115 + 9}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fill={isSeatAvailable(62) ? "black" : "#ccc"}
          pointerEvents="none">
          62
        </text>
      </g>,
    );

    return seats;
  };

  return (
    <>
      <svg width="921" height="145">
        <image href="images\fourth-class-plan.png" width="921" height="145" />
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
        {drawLeftSideSeats()}
        {drawRightSideSeats()}
      </svg>
    </>
  );
}
