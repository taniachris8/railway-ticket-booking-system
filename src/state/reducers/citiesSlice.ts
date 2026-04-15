import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CityType } from "../../types";

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
    getCitiesRequired: (state, _action: PayloadAction<string>) => {
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
    clearCitiesError: (state) => {
      state.error = null;
    },
  },
});

export const { getCitiesRequired, getCitiesSuccess, getCitiesFailure, clearCitiesError} =
  citiesSlice.actions;

export default citiesSlice.reducer;
