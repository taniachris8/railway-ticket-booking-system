import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  from_city_id: string;
  to_city_id: string;
  date_start: string | null;
  date_end: string | null;
  date_start_arrival: string | null;
  date_end_arrival: string | null;
  limit: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price_from: number;
  price_to: number;
  start_departure_hour_from: number;
  start_departure_hour_to: number;
  start_arrival_hour_from: number;
  start_arrival_hour_to: number;
  end_departure_hour_from: number;
  end_departure_hour_to: number;
  end_arrival_hour_from: number;
  end_arrival_hour_to: number;
  offset: number;
  sort: "date" | "price" | "duration";
};

const initialState: FilterState = {
  from_city_id: "",
  to_city_id: "",
  date_start: null,
  date_end: null,
  date_start_arrival: null,
  date_end_arrival: null,
  limit: "5",
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_air_conditioning: false,
  have_express: false,
  price_from: 1920,
  price_to: 7000,
  start_departure_hour_from: 0,
  start_departure_hour_to: 24,
  start_arrival_hour_from: 0,
  start_arrival_hour_to: 24,
  end_departure_hour_from: 0,
  end_departure_hour_to: 24,
  end_arrival_hour_from: 0,
  end_arrival_hour_to: 24,
  offset: 0,
  sort: "date",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterField: <K extends keyof FilterState>(
      state: FilterState,
      action: PayloadAction<{ key: K; value: FilterState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetFilters: (state) => {
      state.from_city_id = initialState.from_city_id;
      state.to_city_id = initialState.to_city_id;
      state.date_start = initialState.date_start;
      state.date_end = initialState.date_end;
      state.date_start_arrival = initialState.date_start_arrival;
      state.date_end_arrival = initialState.date_end_arrival;
      state.limit = initialState.limit;
      state.have_first_class = initialState.have_first_class;
      state.have_second_class = initialState.have_second_class;
      state.have_third_class = initialState.have_third_class;
      state.have_fourth_class = initialState.have_fourth_class;
      state.have_wifi = initialState.have_wifi;
      state.have_air_conditioning = initialState.have_air_conditioning;
      state.have_express = initialState.have_express;
      state.price_from = initialState.price_from;
      state.price_to = initialState.price_to;
      state.start_departure_hour_from = initialState.start_departure_hour_from;
      state.start_departure_hour_to = initialState.start_departure_hour_to;
      state.start_arrival_hour_from = initialState.start_arrival_hour_from;
      state.start_arrival_hour_to = initialState.start_arrival_hour_to;
      state.end_departure_hour_from = initialState.end_departure_hour_from;
      state.end_departure_hour_to = initialState.end_departure_hour_to;
      state.end_arrival_hour_from = initialState.end_arrival_hour_from;
      state.end_arrival_hour_to = initialState.end_arrival_hour_to;
      state.offset = initialState.offset;
    },
  },
});

export const {
  setFilterField,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
