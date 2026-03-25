import styles from "./BirthdayDropdown.module.css";

type BirthdayDropdownProps = {
    setDay: (day: number) => void;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
}

export function BirthdayDropdown({ setDay, setMonth, setYear }: BirthdayDropdownProps) {   
    return (
      <>
        <div
          className={styles.dropdown}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <select
            className={styles.dropdown_item}
            onChange={(e) => setDay(Number(e.target.value))}>
            <option value="">День</option>
            {[...Array(31)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className={styles.dropdown_item}
            onChange={(e) => setMonth(Number(e.target.value))}>
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
            onChange={(e) => setYear(Number(e.target.value))}>
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