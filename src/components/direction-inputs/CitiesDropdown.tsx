import "./DirectionInputs.css";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";

type CitiesDropdownProps = {
  setValue: (value: string) => void;
  setShowDropdown: (value: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  searchTerm: string;
};

export function CitiesDropdown({
  setValue,
  setShowDropdown,
  containerRef,
  searchTerm,
}: CitiesDropdownProps) {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cities = [
    "Ангарск",
    "Архангельск",
    "Астрахань",
    "Барнаул",
    "Белгород",
    "Благовещенск",
    "Братск",
    "Брянск",
    "Великий Новгород",
  ];

  const filteredCities = searchTerm
    ? cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : cities;

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [containerRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        dropdownRef.current &&
        !containerRef.current.contains(target) &&
        !dropdownRef.current.contains(target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, dropdownRef, setShowDropdown]);

  return createPortal(
    <div
      ref={dropdownRef}
      className="dropdown"
      style={{
        position: "absolute",
        top: coords.top + 10,
        left: coords.left,
        width: coords.width,
        zIndex: 9999,
      }}>
      <ul className="dropdown__list">
        {filteredCities.map((city) => (
          <li
            key={city}
            onClick={() => {
              setValue(city);
              setShowDropdown(false);
            }}
            className="dropdown__item">
            <span className="dropdown__item-text">
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}
