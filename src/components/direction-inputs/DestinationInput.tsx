import "./DirectionInputs.css";
import type { RootState } from "../../state/store";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArrivalCity } from "../../state/reducers/ticketsSlice";
import { LocationIcon } from "../../icons/LocationIcon";
import { CitiesDropdown } from "./CitiesDropdown";
import { getCitiesRequired } from "../../state/reducers/citiesSlice";

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
  const destinationCity = useSelector((state: RootState) => state.tickets.arrivalCity);
  const cities = useSelector((state: RootState) => state.cities.data);

   const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
  };
  
    const handleSelectCity = (city: string) => {
      dispatch(setArrivalCity(city)); 
      setSearchTerm(""); 
      setShowDropdown(false);
    };
  
    useEffect(() => {
      const handler = setTimeout(() => {
        if (searchTerm.trim().length >= 2 ) {
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
          value={destinationCity || searchTerm}
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
