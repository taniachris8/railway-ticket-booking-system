import axios from "axios";
import type { CityType } from "../state/reducers/citiesSlice";

const BASE_URL = "https://students.netoservices.ru/fe-diplom/";

export const searchCities = async (searchTerm: string): Promise<CityType[]> => {
  const response = await axios.get(
    BASE_URL + `routes/cities?name=${searchTerm}`,
  );
  return response.data;
};
