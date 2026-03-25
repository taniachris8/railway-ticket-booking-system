import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type PassengersState = {
  user: {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: string;
  };
  departure: {
    route_direction_id: string;
    seats: [
      {
        coach_id: string;
        person_info: {
          is_adult: boolean;
          first_name: string;
          last_name: string;
          patronymic: string;
          gender: boolean;
          birthday: string;
          document_type: string;
          document_data: string;
        };
        seat_number: number;
        is_child: boolean;
        include_children_seat: boolean;
      },
    ];
  };
};

const initialState: PassengersState = {
  user: {
    first_name: "",
    last_name: "",
    patronymic: "",
    phone: "",
    email: "",
    payment_method: "cash",
  },
  departure: {
    route_direction_id: "",
    seats: [
      {
        coach_id: "",
        person_info: {
          is_adult: true,
          first_name: "",
          last_name: "",
          patronymic: "",
          gender: true,
          birthday: "",
          document_type: "",
          document_data: "",
        },
        seat_number: 0,
        is_child: false,
        include_children_seat: false,
      },
    ],
  },
};

const passengersSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {
    // setPassengersField: <K extends keyof PassengersState>(
    //   state: PassengersState,
    //   action: PayloadAction<{ key: K; value: PassengersState[K] }>,
    // ) => {
    //   const { key, value } = action.payload;
    //   state[key] = value;
    // },
    setUserField: (state, action: PayloadAction<{ key: keyof PassengersState["user"], value: any }>) => {
    const { key, value } = action.payload;
    state.user[key] = value;
  },
  // setSeatField: (state, action: PayloadAction<{ seatIndex: number; key: keyof typeof state.departure.seats[0]; value: any }>) => {
  //   const { seatIndex, key, value } = action.payload;
  //   state.departure.seats[seatIndex][key] = value;
  // },
  setPersonInfoField: (state, action: PayloadAction<{ seatIndex: number; key: keyof typeof state.departure.seats[0]["person_info"]; value: any }>) => {
    const { seatIndex, key, value } = action.payload;
    state.departure.seats[seatIndex].person_info[key] = value;
  }
    },
    
});

export const { setUserField, setSeatField, setPersonInfoField } = passengersSlice.actions;

export default passengersSlice.reducer;
