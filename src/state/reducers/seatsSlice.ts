import { createSlice } from "@reduxjs/toolkit";
import type { DepartureType, SeatsInfoType } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

type TrainSeatsState = {
  adultCount: number;
  childCount: number;
  infantCount: number;
  selectedSeats: Record<string, number[]>;
  carriagePrices: Record<string, number>;
  totalPrice: number;
  wifiSelected: boolean;
  linenSelected: boolean;
};

export type SeatsState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: SeatsInfoType[];
  error: string | null;
  progressSeats: number;

  departureTrain: DepartureType | null;
  arrivalTrain: DepartureType | null;

  departure: TrainSeatsState;
  arrival: TrainSeatsState;
};

const trainInitialState: TrainSeatsState = {
  adultCount: 0,
  childCount: 0,
  infantCount: 0,
  selectedSeats: {},
  carriagePrices: {},
  totalPrice: 0,
  wifiSelected: false,
  linenSelected: false,
};

const initialState: SeatsState = {
  status: "idle",
  data: [],
  error: null,
  progressSeats: 0,

  departureTrain: null,
  arrivalTrain: null,

  departure: { ...trainInitialState },
  arrival: { ...trainInitialState },
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
      }>,
    ) => {
      const { direction, carriageId, seatNumber } = action.payload;

      const trainState = state[direction];

      if (!trainState.selectedSeats[carriageId]) {
        trainState.selectedSeats[carriageId] = [];
      }

      const seats = trainState.selectedSeats[carriageId];

      if (seats.includes(seatNumber)) {
        trainState.selectedSeats[carriageId] = seats.filter(
          (seat) => seat !== seatNumber,
        );
      } else {
        seats.push(seatNumber);
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
} = seatsSlice.actions;

export default seatsSlice.reducer;
