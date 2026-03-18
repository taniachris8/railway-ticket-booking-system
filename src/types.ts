export type TicketsType = {
  total_count: number;
  items: TicketType[];
};

export type SeatsInfoType = {
  coach: CoachType;
  seats: SeatType[];
};

export type CoachType = {
  _id: string;
  name: string;
  class_type: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  available_seats: number;
  is_linens_included: boolean;
};

export type SeatType = {
  index: number;
  available: boolean;
};

export type TicketType = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  arrival: DepartureType;
  departure: DepartureType;
  total_avaliable_seats: number;
};

export type DirectionType = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: AvailableSeatsInfoType;
  departure: DepartureType;
};

export type AvailableSeatsInfoType = {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
};

export type DepartureType = {
  _id: string;
  have_first_class: false;
  have_second_class: false;
  have_third_class: true;
  have_fourth_class: true;
  have_wifi: true;
  have_air_conditioning: true;
  is_express: false;
  min_price: 685;
  duration: 337620;
  available_seats: 172;
  available_seats_info: AvailableSeatsInfoType;
  train: TrainType;
  from: FromType;
  to: ToType;
  price_info: PriceInfoType;
};

export type TrainType = {
  _id: string;
  name: string;
};

export type FromType = {
  railway_station_name: string;
  city: CityType;
  datetime: number;
};

export type ToType = {
  railway_station_name: string;
  city: CityType;
  datetime: number;
};

export type CityType = {
  _id: string;
  name: string;
};

export type PriceInfoType = {
  first?: SeatPriceType;
  second?: SeatPriceType;
  third?: SeatPriceType;
  fourth?: SeatPriceType;
};

export type SeatPriceType = {
  price?: number;
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
};
