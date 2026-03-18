import type { SeatType } from "../types";

export const calculateAvailableTopSeats = (seats: SeatType[]) => {
  let availableTopSeats = 0;
  for (const seat of seats) {
    if (seat.available && seat.index <= 32 && seat.index % 2 === 0) {
      availableTopSeats++;
    }
  }
  return availableTopSeats;
};

export const calculateAvailableBottomSeats = (seats: SeatType[]) => {
  let availableBottomSeats = 0;
  for (const seat of seats) {
    if (seat.available && seat.index <= 32 && seat.index % 2 !== 0) {
      availableBottomSeats++;
    }
  }
  return availableBottomSeats;
};

export const calculateAvailableSideSeats = (seats: SeatType[]) => {
  let availableSideSeats = 0;
  for (const seat of seats) {
    if (seat.available && seat.index >= 33) {
      availableSideSeats++;
    }
  }
  return availableSideSeats;
};
