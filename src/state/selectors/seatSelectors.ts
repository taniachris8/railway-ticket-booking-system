import type { RootState } from "../store";

export const selectTrainSeats = (
  state: RootState,
  direction: "departure" | "arrival",
) => state.seats[direction];

export const selectSelectedSeats = (
  state: RootState,
  direction: "departure" | "arrival",
) => state.seats[direction].selectedSeats;

export const selectPassengersCount = (
  state: RootState,
  direction: "departure" | "arrival",
) => {
  const { adultCount, childCount } = state.seats[direction];
  return adultCount + childCount;
};

export const selectSeatsInCarriage = (
  state: RootState,
  direction: "departure" | "arrival",
  carriageId: string,
) => state.seats[direction].selectedSeats[carriageId] ?? [];