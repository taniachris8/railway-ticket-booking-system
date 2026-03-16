type CarriageSeatNumberProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  seatNumber: number;
  available: boolean;
  isSelected: boolean;
  handleSelectSeat: (seatNumber: number) => void;
  textOffsetX: number;
  textOffsetY: number;
};

export function CarriageSeatNumber({
  x,
  y,
  width,
  height,
  seatNumber,
  available,
  isSelected,
  handleSelectSeat,
  textOffsetX,
  textOffsetY,
}: CarriageSeatNumberProps) {
  return (
    <>
      <g
        onClick={available ? () => handleSelectSeat(seatNumber) : undefined}
        style={{
          cursor: available ? "pointer" : "not-allowed",
        }}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={available ? "#E5E5E5" : "#777"}
          stroke={isSelected ? "#FFA800" : "none"}
          strokeWidth={isSelected ? 2 : 0}
        />
        <text
          x={x + textOffsetX}
          y={y + textOffsetY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill={available ? "black" : "#ccc"}
          pointerEvents="none">
          {seatNumber}
        </text>
      </g>
    </>
  );
}
