import { useEffect, useRef } from "react";

import { getPublicAssetPath } from "../../../utils/getPublicAssetPath";

import styles from "./SelectOptionInput.module.css";

type SelectOptionInputProps = {
  selected: string;
  children: React.ReactNode;
  dropdownActive: boolean;
  setDropdownActive: (active: boolean) => void;
};

export function SelectOptionInput({
  selected,
  dropdownActive,
  setDropdownActive,
  children,
}: SelectOptionInputProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setDropdownActive]);

  return (
    <>
      <div ref={dropdownRef}>
        <div
          className={
            selected === "Свидетельство о рождении"
              ? `${styles.input} ${styles.input_long}`
              : styles.input
          }
          onClick={() => setDropdownActive(true)}>
          <p className={styles.value}>{selected}</p>
          <img
            src={getPublicAssetPath("/icons/dropdown-arrow.png")}
            alt="arrow-down"
          />
          {dropdownActive && children}
        </div>
      </div>
    </>
  );
}
