import styles from "./CitiesDropdown.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state/store";
import type { CityType } from "../../../types";

type CitiesDropdownProps = {
  setShowDropdown: (value: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  searchTerm: string;
  onSelect: (city: CityType) => void;
};

export function CitiesDropdown({
  setShowDropdown,
  containerRef,
  searchTerm,
  onSelect,
}: CitiesDropdownProps) {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cities = useSelector((state: RootState) => state.cities.data);

  const noMatches = searchTerm.length > 0 && cities.length === 0;

  const handleClick = (city: CityType) => {
    onSelect(city);
  };

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
      className={styles.dropdown}
      style={{
        position: "absolute",
        top: coords.top + 10,
        left: coords.left,
        width: coords.width,
        zIndex: 9999,
      }}>
      <ul className={styles.dropdown__list}>
        {noMatches ? (
          <span>Населенный пункт не найден</span>
        ) : (
          <>
            {cities.map((city) => (
              <li
                key={city._id}
                onClick={() => handleClick(city)}
                className={styles.dropdown__item}>
                <span className={styles.dropdown__item_text}>{city.name}</span>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>,
    document.body,
  );
}
