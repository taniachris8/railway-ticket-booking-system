import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CityType = {
  _id: number;
  name: string;
};

type CitiesType = {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: CityType[];
  error: string | null;
};

const initialState: CitiesType = {
  status: "idle",
  data: [],
  error: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    getCitiesRequired: (state, action: PayloadAction<string>) => {
    state.status = "loading";
    state.error = null;
    },
    getCitiesSuccess: (state, action: PayloadAction<CityType[]>) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    getCitiesFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { getCitiesRequired, getCitiesSuccess, getCitiesFailure } =
  citiesSlice.actions;

export default citiesSlice.reducer;
