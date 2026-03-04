
import { useDispatch, useSelector } from "react-redux";
import { LocationIcon } from "../../icons/LocationIcon";
import { CitiesDropdown } from "./cities-dropdown/CitiesDropdown";
import { useRef, useState, useEffect } from "react";
import { getCitiesRequired } from "../../state/reducers/citiesSlice";
import type { RootState } from "../../state/store";
import { setTicketField } from "../../state/reducers/ticketsSlice";
import { setFilterField } from "../../state/reducers/filterSlice";
import { formatCityName } from "../../utils/formatCityName";
import type { CityType } from "../../types";

type DepartureInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
};

export function DepartureInput({
  containerClassName,
  inputClassName,
  iconClassName,
}: DepartureInputProps) {
  const departureCity = useSelector(
    (state: RootState) => state.tickets.from_city,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const cities = useSelector((state: RootState) => state.cities.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTicketField({ key: "from_city", value: "" }));
    setSearchTerm(e.target.value);
  };

  const handleSelectCity = (city: CityType) => {
    dispatch(setTicketField({ key: "from_city", value: city.name }));
    dispatch(setFilterField({ key: "from_city_id", value: city._id }));
    setSearchTerm("");
    setShowDropdown(false);
    console.log("cityId", city._id)
  };

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

  return (
    <>
      <div ref={containerRef} className={containerClassName}>
        <input
          type="text"
          className={inputClassName}
          placeholder="Откуда"
          value={formatCityName(departureCity) || searchTerm}
          onChange={handleChange}
          
        />
        <LocationIcon className={iconClassName} />
        {showDropdown && cities.length > 0 && (
          <CitiesDropdown
            searchTerm={searchTerm.trim()}
            setShowDropdown={setShowDropdown}
            containerRef={containerRef}
            onSelect={handleSelectCity}
          />
        )}
      </div>
    </>
  );
}
