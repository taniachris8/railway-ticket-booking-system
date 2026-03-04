import type { RootState } from "../../state/store";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicketField } from "../../state/reducers/ticketsSlice";
import { LocationIcon } from "../../icons/LocationIcon";
import { CitiesDropdown } from "./cities-dropdown/CitiesDropdown";
import { getCitiesRequired } from "../../state/reducers/citiesSlice";
import { formatCityName } from "../../utils/formatCityName";
import type { CityType } from "../../types";
import { setFilterField } from "../../state/reducers/filterSlice";

type DestinationInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
};

export function DestinationInput({
  containerClassName,
  inputClassName,
  iconClassName,
}: DestinationInputProps) {
  const dispatch = useDispatch();
  const destinationCity = useSelector(
    (state: RootState) => state.tickets.to_city,
  );
  const cities = useSelector((state: RootState) => state.cities.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTicketField({ key: "to_city", value: "" }));
    setSearchTerm(e.target.value);
  };

  const handleSelectCity = (city: CityType) => {
    dispatch(setTicketField({ key: "to_city", value: city.name }));
    dispatch(setFilterField({ key: "to_city_id", value: city._id }));
    setSearchTerm("");
    setShowDropdown(false);
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
  }, [searchTerm, cities, dispatch]);

  return (
    <>
      <div ref={containerRef} className={containerClassName}>
        <input
          type="text"
          className={inputClassName}
          placeholder="Куда"
          value={formatCityName(destinationCity) || searchTerm}
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
