import { createSlice } from "@reduxjs/toolkit";
import type { TicketsType } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TicketsState = {
  from_city: string;
  to_city: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: TicketsType;
  error: string | null;
  progress: number;
};

const initialState: TicketsState = {
  from_city: "",
  to_city: "",
  status: "idle",
  data: {
    total_count: 0,
    items: [],
  },
  error: null,
  progress: 0,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTicketField: <K extends keyof TicketsState>(
      state: TicketsState,
      action: PayloadAction<{ key: K; value: TicketsState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    getTicketsRequired: (state) => {
      state.status = "loading";
      state.progress = 0;
      state.error = null;
    },
    getTicketsSuccess: (state, action: PayloadAction<TicketsType>) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    getTicketsFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const {
  setTicketField,
  getTicketsRequired,
  getTicketsSuccess,
  getTicketsFailure,
  setProgress,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
