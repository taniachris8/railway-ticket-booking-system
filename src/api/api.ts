import axios from "axios";

import type { CityType } from "../state/reducers/citiesSlice";
import type { DirectionType, OrderType, SeatsInfoType } from "../types";
import type { TicketsType } from "../types";
import type { FilterState } from "../state/reducers/filterSlice";
import type { FilterSeatsState } from "../state/reducers/filterSeatsSlice";

const BASE_URL = "https://students.netoservices.ru/fe-diplom/";

export const searchCities = async (searchTerm: string): Promise<CityType[]> => {
  const response = await axios.get(
    BASE_URL + `routes/cities?name=${searchTerm}`,
  );
  return response.data;
};

export const fetchLastDirections = async (): Promise<DirectionType[]> => {
  const response = await axios.get(BASE_URL + "routes/last");
  return response.data;
};

export const searchDirections = async (
  params: Partial<FilterState>,
): Promise<TicketsType> => {
  const cleanedParams: Record<string, string | number | boolean> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === false
    )
      return;

    cleanedParams[key] = value;
  });

  const response = await axios.get(BASE_URL + "routes", {
    params: cleanedParams,
  });

  return response.data;
};

export const getAvailableSeats = async (
  id: string,
): Promise<SeatsInfoType[]> => {
  const response = await axios.get(
    `https://students.netoservices.ru/fe-diplom/routes/${id}/seats`,
  );
  return response.data;
};

export const searchSeats = async (
  params: Partial<FilterSeatsState>,
): Promise<SeatsInfoType[]> => {
  const cleanedParams: Record<string, string | number | boolean> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      key === "_persist" ||
      value === false ||
      key === "id" ||
      value === null ||
      value === undefined ||
      value === "" ||
      key === "have_first_class" ||
      key === "have_second_class" ||
      key === "have_third_class" ||
      key === "have_fourth_class"
    )
      return;

    cleanedParams[key] = value;
  });

  const response = await axios.get(
    `https://students.netoservices.ru/fe-diplom/routes/${params.id}/seats`,
    { params: cleanedParams },
  );

  return response.data;
};

export const orderTickets = async (data: OrderType): Promise<void> => {
  axios.post(BASE_URL + "order", data);
};

export const submitTicketOrder = async (
  newOrder: OrderType,
): Promise<unknown> => {
  console.log("from api func", newOrder);
  const response = await axios.post(BASE_URL + "order", newOrder);
  return response.data;
};

export const subscribe = async (
  email: string,
): Promise<unknown> => {
  const response = await axios.post(BASE_URL + "subscribe", email);
  return response.data;
};