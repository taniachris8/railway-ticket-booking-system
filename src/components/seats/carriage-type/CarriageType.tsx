import { FirstClassIcon } from "../../../icons/FirstClassIcon";
import { FourthClassIcon } from "../../../icons/FourthClassIcon";
import { SecondClassIcon } from "../../../icons/SecondClassIcon";
import { ThirdClassIcon } from "../../../icons/ThirdClassIcon";
import styles from "./CarriageType.module.css";
import { Carriage } from "../carriage/Carriage";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state/store";
import type { SeatsInfoType } from "../../../types";

type CarriageTypeProps = {
  data: SeatsInfoType;
};

export function CarriageType({data}: CarriageTypeProps) {
  const seatsData = useSelector((state: RootState) => state.seats.data);
  console.log("from carriageType:", seatsData);

  const types = [
    {
      id: "fourth",
      label: "Сидячий",
      icon: <FourthClassIcon className={styles.carriage__type_icon} />,
    },
    {
      id: "third",
      label: "Плацкарт",
      icon: <ThirdClassIcon className={styles.carriage__type_icon} />,
    },
    {
      id: "second",
      label: "Купе",
      icon: <SecondClassIcon className={styles.carriage__type_icon} />,
    },
    {
      id: "first",
      label: "Люкс",
      icon: <FirstClassIcon className={styles.carriage__type_icon} />,
    },
  ];

  return (
    <>
      <section className={styles.carriage__type}>
        <h4 className={styles.carriage__type_title}>Тип вагона</h4>
        <nav>
          <ul className={styles.carriage__type_list}>
            {types.map((type) => (
              <li
                key={type.id}
                className={
                  type.id === data.coach.class_type
                    ? `${styles.carriage__type_item} ${styles.carriage__type_item_active}`
                    : styles.carriage__type_item
                }
              >
                {type.icon}
                <p className={styles.carriage__type_text}>{type.label}</p>
              </li>
            ))}
          </ul>
        </nav>
        <Carriage
          key={data.coach._id}
          data={data}
        />
      </section>
    </>
  );
}
