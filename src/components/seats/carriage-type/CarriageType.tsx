import { FirstClassIcon } from "../../../icons/FirstClassIcon";
import { FourthClassIcon } from "../../../icons/FourthClassIcon";
import { SecondClassIcon } from "../../../icons/SecondClassIcon";
import { ThirdClassIcon } from "../../../icons/ThirdClassIcon";
import styles from "./CarriageType.module.css";
import { Carriage } from "../carriage/Carriage";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state/store";
import { useState } from "react";
import { Module } from "../../module/Module";

export function CarriageType({ direction }: { direction: "departure" | "arrival" }) {
  const seatsData = useSelector((state: RootState) => state.seats.data);
  const { adultCount } = useSelector((state: RootState) => state.seats[direction]);
  console.log("from carriageType:", seatsData);
  const [showWarningModule, setShowWarningModule] = useState(false);
  const [
    showUnavailableCarriageTypeModule,
    setShowUnavailableCarriageTypeModule,
  ] = useState(false);
  const [activeClassType, setActiveClassType] = useState("");

  const filteredCarriages = seatsData.filter(
    (data) => data.coach.class_type === activeClassType,
  );

  const handleChooseCarriageType = (id: string) => {
    if (adultCount === 0) {
      setShowWarningModule(true);
      return;
    }

    const hasCarriage = seatsData.some((data) => data.coach.class_type === id);

    if (!hasCarriage) {
      setShowUnavailableCarriageTypeModule(true);
      return;
    }

    setActiveClassType(id);
  };

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
                  type.id === activeClassType
                    ? `${styles.carriage__type_item} ${styles.carriage__type_item_active}`
                    : styles.carriage__type_item
                }
                onClick={() => handleChooseCarriageType(type.id)}>
                {type.icon}
                <p className={styles.carriage__type_text}>{type.label}</p>
              </li>
            ))}
          </ul>
        </nav>

        {activeClassType &&
          filteredCarriages.map((data) => (
            <Carriage key={data.coach._id} data={data} direction={direction} />
          ))}
        {showWarningModule && (
          <Module
            type="info"
            message="Выберите количество взрослых пассажиров, чтобы продолжить"
            onClick={() => setShowWarningModule(false)}
          />
        )}
        {showUnavailableCarriageTypeModule && (
          <Module
            type="info"
            message="Выбранный тип вагона недоступен для данного поезда"
            onClick={() => setShowUnavailableCarriageTypeModule(false)}
          />
        )}
      </section>
    </>
  );
}
