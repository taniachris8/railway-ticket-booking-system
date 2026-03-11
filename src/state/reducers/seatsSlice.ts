import { createSlice } from "@reduxjs/toolkit";
import type { DepartureType, SeatsInfoType } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SeatsState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: SeatsInfoType[];
  error: string | null;
  progressSeats: number;
  departureTrain: DepartureType | null;
  arrivalTrain: DepartureType | null;
  adultCount: number;
  childCount: number;
  infantCount: number;
  
};

const initialState: SeatsState = {
  status: "idle",
  data: [],
  error: null,
  progressSeats: 0,
  departureTrain: null,
  arrivalTrain: null,
  adultCount: 0,
  childCount: 0,
  infantCount: 0,
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setSeatsField: <K extends keyof SeatsState>(
      state: SeatsState,
      action: PayloadAction<{ key: K; value: SeatsState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
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
  },
});

export const {
  getSeatsRequired,
  getSeatsSuccess,
  getSeatsFailure,
  setSeatsProgress,
  setSeatsField,
} = seatsSlice.actions;

export default seatsSlice.reducer;
