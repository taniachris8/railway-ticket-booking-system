import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../state/store";
import type { CityType } from "../../../types";

import { setTicketField } from "../../../state/reducers/ticketsSlice";
import { getCitiesRequired } from "../../../state/reducers/citiesSlice";
import { setFilterField } from "../../../state/reducers/filterSlice";

import { CityInput } from "../city-input/CityInput";

type CityAutocompleteInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
  placeholder: string;

  cityKey: "from_city" | "to_city";
  cityIdKey: "from_city_id" | "to_city_id";
};

export function CityAutocompleteInput({
  containerClassName,
  inputClassName,
  iconClassName,
  placeholder,
  cityKey,
  cityIdKey,
}: CityAutocompleteInputProps) {
  const dispatch = useDispatch();

  const city = useSelector((state: RootState) => state.tickets[cityKey]);
  const cities = useSelector((state: RootState) => state.cities.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        setShowDropdown(true);
        dispatch(getCitiesRequired(searchTerm));
      } else {
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, dispatch]);

  const suggestion = useMemo(() => {
    if (!searchTerm || cities.length === 0) return "";

    const match = cities.find((city: CityType) =>
      city.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );

    return match ? match.name : "";
  }, [searchTerm, cities]);

  const typedPart = searchTerm;
  const suggestedPart = suggestion.slice(searchTerm.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTicketField({ key: cityKey, value: "" }));
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setSearchTerm(suggestion);
    }
  };

  const handleSelectCity = (city: CityType) => {
    dispatch(setTicketField({ key: cityKey, value: city.name }));
    dispatch(setFilterField({ key: cityIdKey, value: city._id }));

    setSearchTerm("");
    setShowDropdown(false);
  };
  return (
    <CityInput
      containerClassName={containerClassName}
      inputClassName={inputClassName}
      iconClassName={iconClassName}
      placeholder={placeholder}
      city={city}
      searchTerm={searchTerm}
      typedPart={typedPart}
      suggestedPart={suggestedPart}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      showDropdown={showDropdown}
      handleSelectCity={handleSelectCity}
      setShowDropdown={setShowDropdown}
    />
  );
}
