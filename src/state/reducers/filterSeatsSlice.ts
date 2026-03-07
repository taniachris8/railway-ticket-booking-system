import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FilterSeatsState = {
    id: string;
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    have_express: boolean;
};

const initialState: FilterSeatsState = {
    id: "",
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    have_express: false,
};

const seatsFiltersSlice = createSlice({
  name: "seatsFilters",
  initialState,
  reducers: {
    setSeatsFiltersField: <K extends keyof FilterSeatsState>(
      state: FilterSeatsState,
      action: PayloadAction<{ key: K; value: FilterSeatsState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetSeatsFilters: (state) => {
      state.id = initialState.id;
      state.have_first_class = initialState.have_first_class;
      state.have_second_class = initialState.have_second_class;
      state.have_third_class = initialState.have_third_class;
      state.have_fourth_class = initialState.have_fourth_class;
      state.have_wifi = initialState.have_wifi;
      state.have_air_conditioning = initialState.have_air_conditioning;
      state.have_express = initialState.have_express;
    },
  },
});

export const { setSeatsFiltersField, resetSeatsFilters } = seatsFiltersSlice.actions;

export default seatsFiltersSlice.reducer;
