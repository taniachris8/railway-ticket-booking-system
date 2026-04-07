import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { resetPassengersStateAction } from "../actions/resetPassengers";

type RouteDirectionPayload = {
  direction: "departure" | "arrival";
  route_direction_id: string;
};

export type PassengersState = {
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
    seats: {
      coach_id: string;
      person_info: {
        is_adult: boolean;
        first_name: string;
        last_name: string;
        patronymic: string;
        gender: boolean;
        birthday: string;
        document_type: "passport_rf" | "birth_certificate" | "passport";
        document_data: string;
      };
      seat_number: number;
      is_child: boolean;
      include_children_seat: boolean;
    }[];
  };
  arrival: {
    route_direction_id: string;
    seats: {
      coach_id: string;
      person_info: {
        is_adult: boolean;
        first_name: string;
        last_name: string;
        patronymic: string;
        gender: boolean;
        birthday: string;
        document_type: "passport_rf" | "birth_certificate" | "passport";
        document_data: string;
      };
      seat_number: number;
      is_child: boolean;
      include_children_seat: boolean;
    }[];
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
    seats: [],
  },
  arrival: {
    route_direction_id: "",
    seats: [],
  },
};

const passengersSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {
    setRouteDirectionId: (
      state,
      action: PayloadAction<RouteDirectionPayload>,
    ) => {
      const { direction, route_direction_id } = action.payload;
      state[direction].route_direction_id = route_direction_id;
    },
    setUserField: <K extends keyof PassengersState["user"]>(
      state: PassengersState,
      action: PayloadAction<{
        key: K;
        value: PassengersState["user"][K];
      }>,
    ) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
    setPersonInfoField: <
      K extends
        keyof PassengersState["departure"]["seats"][number]["person_info"],
    >(
      state: PassengersState,
      action: PayloadAction<{
        seatIndex: number;
        key: K;
        value: PassengersState["departure"]["seats"][number]["person_info"][K];
      }>,
    ) => {
      const { seatIndex, key, value } = action.payload;
      state.departure.seats[seatIndex].person_info[key] = value;
    },
    setSeats: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        seats: PassengersState["departure"]["seats"];
      }>,
    ) => {
      state[action.payload.direction].seats = action.payload.seats;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPassengersStateAction, () => {
      return initialState;
    });
  },
});

export const {
  setUserField,
  setSeats,
  setPersonInfoField,
  setRouteDirectionId,
} = passengersSlice.actions;

export default passengersSlice.reducer;
