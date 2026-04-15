import { createSlice } from "@reduxjs/toolkit";

import type { DepartureType, SeatsInfoType, TicketType } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { resetSearchStateAction } from "../actions/resetSearch";

export type SelectedSeat = {
  seatNumber: number;
  price: number;
};

type TrainSeatsState = {
  adultCount: number;
  childCount: number;
  infantCount: number;
  selectedSeats: Record<string, SelectedSeat[]>;
  wifiSelected: boolean;
  linenSelected: boolean;
  ACSelected: boolean;
  foodSelected: boolean;
  wifiPrice?: number;
  linenPrice?: number;
};

export type SeatsState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: SeatsInfoType[];
  error: string | null;
  progressSeats: number;

  departureTrain: DepartureType | null;
  arrivalTrain: DepartureType | null;

  ticket: TicketType | null;

  departure: TrainSeatsState;
  arrival: TrainSeatsState;

  totalPrice: number;
};

const trainInitialState: TrainSeatsState = {
  adultCount: 0,
  childCount: 0,
  infantCount: 0,
  selectedSeats: {},
  wifiSelected: false,
  linenSelected: false,
  ACSelected: false,
  foodSelected: false,
  wifiPrice: 0,
  linenPrice: 0,
};

const initialState: SeatsState = {
  status: "idle",
  data: [],
  error: null,
  progressSeats: 0,

  ticket: null,
  departureTrain: null,
  arrivalTrain: null,

  departure: { ...trainInitialState },
  arrival: { ...trainInitialState },

  totalPrice: 0,
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    toggleSeat: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        carriageId: string;
        seatNumber: number;
        seatPrice: number;
      }>,
    ) => {
      const { direction, carriageId, seatNumber, seatPrice } = action.payload;
      const trainState = state[direction];

      if (!trainState.selectedSeats[carriageId]) {
        trainState.selectedSeats[carriageId] = [];
      }

      const seats = trainState.selectedSeats[carriageId];

      const existingIndex = seats.findIndex(
        (seat) => seat.seatNumber === seatNumber,
      );

      if (existingIndex !== -1) {
        seats.splice(existingIndex, 1);
      } else {
        seats.push({ seatNumber, price: seatPrice });
      }
    },
    setPassengers: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        adultCount?: number;
        childCount?: number;
        infantCount?: number;
      }>,
    ) => {
      const { direction, adultCount, childCount, infantCount } = action.payload;

      const train = state[direction];

      if (adultCount !== undefined) {
        train.adultCount = adultCount;

        if (train.infantCount > adultCount) {
          train.infantCount = adultCount;
        }

        if (adultCount === 0) {
          train.childCount = 0;
          train.infantCount = 0;
        }
      }

      if (childCount !== undefined) {
        train.childCount = childCount;
      }

      if (infantCount !== undefined) {
        train.infantCount = infantCount;
      }

      train.selectedSeats = {};
    },
    setSeatsField: <K extends keyof SeatsState>(
      state: SeatsState,
      action: PayloadAction<{ key: K; value: SeatsState[K] }>,
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    getSeatsRequired: (state) => {
      state.status = "loading";
      state.progressSeats = 0;
      state.error = null;
    },
    getSeatsSuccess: (state, action: PayloadAction<SeatsInfoType[]>) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    getSeatsFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setSeatsProgress: (state, action: PayloadAction<number>) => {
      state.progressSeats = action.payload;
    },
    resetTrainState: (
      state,
      action: PayloadAction<"departure" | "arrival">,
    ) => {
      const direction = action.payload;
      state[direction] = { ...trainInitialState };
    },
    clearSeatsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetSearchStateAction, (state) => {
      state.status = "idle";
      state.progressSeats = 0;
      state.error = null;
      state.data = [];

      state.departureTrain = null;
      state.arrivalTrain = null;

      state.departure = { ...trainInitialState };
      state.arrival = { ...trainInitialState };
    });
  },
});

export const {
  toggleSeat,
  setPassengers,
  getSeatsRequired,
  getSeatsSuccess,
  getSeatsFailure,
  setSeatsProgress,
  setSeatsField,
  resetTrainState,
  clearSeatsError,
} = seatsSlice.actions;

export default seatsSlice.reducer;
