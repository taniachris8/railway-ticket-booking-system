import styles from "./BirthdayDropdown.module.css";

type BirthdayDropdownProps = {
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      day: number;
      month: number;
      year: number;
    } | null>
  >;
};

export function BirthdayDropdown({  setSelectedDate }: BirthdayDropdownProps) {   
    return (
      <>
        <div
          className={styles.dropdown}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <select
            className={styles.dropdown_item}
            onChange={(e) =>
              setSelectedDate((prev) => ({
                day: Number(e.target.value),
                month: prev?.month ?? 0,
                year: prev?.year ?? 0,
              }))
            }>
            <option value="">День</option>
            {[...Array(31)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className={styles.dropdown_item}
            onChange={(e) =>
              setSelectedDate((prev) => ({
                day: prev?.day ?? 0,
                month: Number(e.target.value),
                year: prev?.year ?? 0,
              }))
            }>
            <option value="">Месяц</option>
            {[
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Май",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь",
            ].map((month, i) => (
              <option key={i} value={i + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            className={styles.dropdown_item}
            onChange={(e) =>
              setSelectedDate((prev) => ({
                day: prev?.day ?? 0,
                month: prev?.month ?? 0,
                year: Number(e.target.value),
              }))
            }>
            <option value="">Год</option>
            {Array.from(
              { length: 100 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </>
    );
}