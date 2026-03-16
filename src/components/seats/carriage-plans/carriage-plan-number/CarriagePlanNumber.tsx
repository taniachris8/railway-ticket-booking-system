export function CarriagePlanNumber({ carriageNumber }: { carriageNumber: string }) {
    return (
      <>
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
      </>
    );
}