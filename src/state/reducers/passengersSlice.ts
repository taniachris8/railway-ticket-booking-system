import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type SeatsPayload = {
  departure: Record<string, number[]>;
  arrival: Record<string, number[]>;
};

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
    setUserField: (
      state,
      action: PayloadAction<{ key: keyof PassengersState["user"]; value: any }>,
    ) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
    setPersonInfoField: (
      state,
      action: PayloadAction<{
        seatIndex: number;
        key: keyof (typeof state.departure.seats)[number]["person_info"];
        value: any;
      }>,
    ) => {
      const { seatIndex, key, value } = action.payload;
      state.departure.seats[seatIndex].person_info[key] = value;
    },
    setSeatsFromSelection: (state, action: PayloadAction<SeatsPayload>) => {
      const { departure, arrival } = action.payload;

      type SeatType = PassengersState["departure"]["seats"][0];

      const buildSeats = (
        selectedSeats: Record<string, number[]>,
      ): SeatType[] => {
        const result: SeatType[] = [];

        Object.entries(selectedSeats).forEach(([coachId, seats]) => {
          seats.forEach((seatNumber) => {
            result.push({
              coach_id: coachId,
              seat_number: seatNumber,
              is_child: false,
              include_children_seat: false,
              person_info: {
                is_adult: true,
                first_name: "",
                last_name: "",
                patronymic: "",
                gender: true,
                birthday: "",
                document_type: "passport_rf",
                document_data: "",
              },
            });
          });
        });

        return result;
      };

      state.departure.seats = buildSeats(departure);
      state.arrival.seats = buildSeats(arrival);
    },
  },
});

export const { setUserField, setSeatsFromSelection, setPersonInfoField } =
  passengersSlice.actions;

export default passengersSlice.reducer;
