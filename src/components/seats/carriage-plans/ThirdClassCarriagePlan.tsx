export type ClassCarriagePlanProps = {
  isSeatAvailable: (seatNumber: number) => boolean;
  handleSelectSeat: (seatNumber: number) => void;
  selected: number[];
  carriageNumber: string;
};

export function ThirdClassCarriagePlan({
 isSeatAvailable, handleSelectSeat, selected, carriageNumber, 
}: ClassCarriagePlanProps) {
 
  const drawSeats = () => {
    const seats = [];
    let x = 130;

    for (let i = 0; i < 32; i++) {
      const seatNumber = i + 1;
      const y = i % 2 === 0 ? 60 : 28;
      const available = isSeatAvailable(seatNumber);
       const isSelected = selected.includes(seatNumber);

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
            width="28"
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
            fill={available ? "black" : "#ccc"}>
            {seatNumber}
          </text>
        </g>,
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
       const isSelected = selected.includes(seatNumber);

      sideSeats.push(
        <g
          key={seatNumber}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
          style={{
            cursor: available ? "pointer" : "not-allowed",
          }}>
          <rect
            x={x}
            y={y}
            width="45"
            height="25"
            fill={available ? "#E5E5E5" : "#777"}
            stroke={isSelected ? "#FFA800" : "none"}
            strokeWidth={isSelected ? 2 : 0}
          />

          <text
            x={x + 22.5}
            y={y + 12.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill={available ? "black" : "#ccc"}>
            {seatNumber}
          </text>
        </g>,
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
        {drawSideSeats()}
      </svg>
    </>
  );
}
