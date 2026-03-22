import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type PassengersState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  progressPassengers: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  is_adult: boolean;
  gender: boolean;
  birthday: string;
  document_type: string;
  document_data: string;
  payment_method: string;
};

const initialState: PassengersState = {
  status: "idle",
  error: null,
  progressPassengers: 0,
  first_name: "",
  last_name: "",
  patronymic: "",
  phone: "",
  email: "",
  is_adult: false,
  gender: false,
  birthday: "",
  document_type: "",
  document_data: "",
  payment_method: "",
};

const passengersSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {
    setPassengersField: <K extends keyof PassengersState>(
      state: PassengersState,
      action: PayloadAction<{ key: K; value: PassengersState[K] }>,
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
  //    getSeatsRequired: (state) => {
  //      state.status = "loading";
  //      state.progressSeats = 0;
  //      state.error = null;
  //    },
  //    getSeatsSuccess: (state, action: PayloadAction<SeatsInfoType[]>) => {
  //      state.data = action.payload;
  //      state.status = "succeeded";
  //      state.error = null;
  //    },
  //    getSeatsFailure: (state, action: PayloadAction<string>) => {
  //      state.status = "failed";
  //      state.error = action.payload;
  //    },
  //    setSeatsProgress: (state, action: PayloadAction<number>) => {
  //      state.progressSeats = action.payload;
  //    },
});

export const { setPassengersField } = passengersSlice.actions;

export default passengersSlice.reducer;
