import { createSlice } from "@reduxjs/toolkit";

type TicketsState = {
  departureCity: string;
  arrivalCity: string;
  departureDate: Date | null;
  returnDate: Date | null;
};

const initialState: TicketsState = {
  departureCity: "",
  arrivalCity: "",
  departureDate: null,
  returnDate: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setDepartureCity: (state, action) => {
      state.departureCity = action.payload;
    },
    setArrivalCity: (state, action) => {
      state.arrivalCity = action.payload;
    },
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
  },
});

export const { setDepartureCity, setArrivalCity, setDepartureDate, setReturnDate } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
