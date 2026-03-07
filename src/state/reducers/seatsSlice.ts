import { createSlice } from "@reduxjs/toolkit";
import type { SeatsInfoType } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SeatsState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: SeatsInfoType[];
  error: string | null;
  progressSeats: number;
};

const initialState: SeatsState = {
  status: "idle",
  data: [],
  error: null,
  progressSeats: 0,
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    // setTicketField: <K extends keyof TicketsState>(
    //   state: TicketsState,
    //   action: PayloadAction<{ key: K; value: TicketsState[K] }>,
    // ) => {
    //   state[action.payload.key] = action.payload.value;
    // },
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
} = seatsSlice.actions;

export default seatsSlice.reducer;
