import type { SelectedSeat } from "../state/reducers/seatsSlice";

export const calculateTotalPrice = (seats: SelectedSeat[][]): string => {
  const total = seats.reduce((total, seats) => {
    return total + seats.reduce((acc, seat) => acc + seat.price, 0);
  }, 0);

  return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};