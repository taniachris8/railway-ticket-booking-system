import { useState } from "react";
import styles from "./TicketsQuantity.module.css";
import { TicketsQuantityItem } from "./TicketsQuantityItem";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state/store";
import type { TicketItem } from "./TicketsQuantityItem";

export function TicketsQuantity() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { adultCount, childCount } = useSelector(
    (state: RootState) => state.seats,
  );

  const items: TicketItem[] = [
    {
      type: "Взрослых — ",
      maxCount: 5,
      info: `Можно добавить ещё ${5 - adultCount} пассажиров`,
      keyLabel: "adultCount",
    },
    {
      type: "Детских — ",
      maxCount: 4,
      info: `Можно добавить еще ${4 - childCount} детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%`,
      keyLabel: "childCount",
    },
    {
      type: "Детских «без места» — ",
      maxCount: 5,
      keyLabel: "infantCount",
    },
  ];

  return (
    <div className={styles.tickets__quantity}>
      <h4 className={styles.tickets__quantity_title}>Количество билетов</h4>
      <div className={styles.tickets__quantity_items}>
        {items.map((item, index) => (
          <TicketsQuantityItem
            key={item.type}
            type={item.type}
            maxCount={item.maxCount}
            info={item.info}
            keyLabel={item.keyLabel}
            active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            
          />
        ))}
      </div>
    </div>
  );
}
