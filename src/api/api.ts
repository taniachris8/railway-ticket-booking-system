import axios from "axios";
import type { CityType } from "../state/reducers/citiesSlice";
import type { DirectionType, SeatsInfoType } from "../types";
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

  console.log("Cleaned Params:", cleanedParams);

  const response = await axios.get(BASE_URL + "routes", {
    params: cleanedParams,
  });

  return response.data;
};

export const searchSeats = async (
  params: Partial<FilterSeatsState>,
): Promise<SeatsInfoType[]> => {
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

  console.log("Cleaned Params:", cleanedParams);

  const response = await axios.get(BASE_URL + `routes/${params.id}/seats`, {
    params: cleanedParams,
  });

  return response.data;
};
