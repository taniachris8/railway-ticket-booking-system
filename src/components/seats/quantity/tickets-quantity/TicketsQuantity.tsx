import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../../state/store";
import type { TicketItem } from "../tickets-quantity-item/TicketsQuantityItem";

import { TicketsQuantityItem } from "../tickets-quantity-item/TicketsQuantityItem";

import styles from "./TicketsQuantity.module.css";

export function TicketsQuantity({
  direction,
}: {
  direction: "departure" | "arrival";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { adultCount, childCount } = useSelector(
    (state: RootState) => state.seats[direction],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      maxCount: adultCount,
      info: `Количество детских билетов без места не может превышать количество взрослых пассажиров. За детей без места платить не нужно.`,
      keyLabel: "infantCount",
    },
  ];

  return (
    <div ref={containerRef} className={styles.tickets__quantity}>
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
            direction={direction}
          />
        ))}
      </div>
    </div>
  );
}
