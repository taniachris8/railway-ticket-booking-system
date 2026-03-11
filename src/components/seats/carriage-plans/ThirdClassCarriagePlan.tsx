export type ClassCarriagePlanProps = {
  isSeatAvailable: (seatNumber: number) => boolean;
  handleSelectSeat: (seatNumber: number) => void;
  selected: number | null;
};

export function ThirdClassCarriagePlan({
 isSeatAvailable, handleSelectSeat, selected, 
}: ClassCarriagePlanProps) {
 
  const drawSeats = () => {
    const seats = [];
    let x = 130;

    for (let i = 0; i < 32; i++) {
      const seatNumber = i + 1;
      const y = i % 2 === 0 ? 60 : 30;
      const available = isSeatAvailable(seatNumber);

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
    const y = 110;
    let x = 135;

    for (let i = 33; i < 48; i++) {
      const seatNumber = i;
      const available = isSeatAvailable(seatNumber);

      sideSeats.push(
        <rect
          key={seatNumber}
          x={x}
          y={y}
          width="45"
          height="25"
          fill="transparent"
          style={{
            cursor: available ? "pointer" : "not-allowed",
            outline: selected === seatNumber ? "2px solid #FFA800" : "none",
          }}
          onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
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
        <image href="images\third-class-plan.png" width="921" height="145" />
        {drawSeats()}
        {drawSideSeats()}
      </svg>
    </>
  );
}
