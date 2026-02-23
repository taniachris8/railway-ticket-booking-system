import { LocationIcon } from "../../icons/LocationIcon";
import { CitiesDropdown } from "./CitiesDropdown";
import "./DirectionInputs.css";
import { useRef, useState } from "react";

type DirectionInputProps = {
  city: string;
  setCity: (value: string) => void;
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
  placeholderText: string;
};

export function DirectionInput({
  city,
  setCity,
  placeholderText,
  containerClassName,
  inputClassName,
  iconClassName,
}: DirectionInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div ref={containerRef} className={containerClassName}>
        <input
          onFocus={() => setShowDropdown(true)}
          type="text"
          className={inputClassName}
          placeholder={placeholderText}
          value={city}
          onChange={handleChange}
        />
        <LocationIcon className={iconClassName} />
        {showDropdown && (
          <CitiesDropdown
            searchTerm={searchTerm.trim()}
            setValue={setCity}
            setShowDropdown={setShowDropdown}
            containerRef={containerRef}
          />
        )}
      </div>
    </>
  );
}
