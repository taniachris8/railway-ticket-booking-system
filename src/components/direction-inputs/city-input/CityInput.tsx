import { useRef } from "react";

import type { CityType } from "../../../types";

import { formatCityName } from "../../../utils/formatCityName";

import { CitiesDropdown } from "../cities-dropdown/CitiesDropdown";

import { LocationIcon } from "../../../icons/LocationIcon";

import styles from "./CityInput.module.css";

type CityInputProps = {
  containerClassName: string;
  inputClassName: string;
  iconClassName: string;
  placeholder: string;
  city: string;
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showDropdown: boolean;
  handleSelectCity: (city: CityType) => void;
  setShowDropdown: (show: boolean) => void;
  typedPart: string;
  suggestedPart: string;
};

export function CityInput({
  containerClassName,
  inputClassName,
  iconClassName,
  placeholder,
  typedPart,
  suggestedPart,
  city,
  searchTerm,
  handleChange,
  handleKeyDown,
  showDropdown,
  handleSelectCity,
  setShowDropdown,
}: CityInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={containerClassName}>
      <div className={styles.typeahead__wrapper}>
        <div className={`${styles.typeahead__suggestion} ${inputClassName}`}>
          {typedPart}
          <span className={styles.typeahead__gray}>{suggestedPart}</span>
        </div>
        <input
          type="text"
          className={`${inputClassName} ${styles.typeahead__input}`}
          placeholder={placeholder}
          value={formatCityName(city) || searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>

      <LocationIcon className={iconClassName} />

      {showDropdown && (
        <CitiesDropdown
          searchTerm={searchTerm.trim()}
          setShowDropdown={setShowDropdown}
          containerRef={containerRef}
          onSelect={handleSelectCity}
        />
      )}
    </div>
  );
}
