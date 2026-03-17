import { useState, type JSX } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../state/store";

import { Modal } from "../../modal/Modal";
import { Carriage } from "../carriage/Carriage";

import { FirstClassIcon } from "../../../icons/FirstClassIcon";
import { SecondClassIcon } from "../../../icons/SecondClassIcon";
import { ThirdClassIcon } from "../../../icons/ThirdClassIcon";
import { FourthClassIcon } from "../../../icons/FourthClassIcon";

import styles from "./CarriageType.module.css";

type CarriageClassType = "first" | "second" | "third" | "fourth";

export function CarriageType({
  direction,
  handleCarriageTypeChange,
}: {
  direction: "departure" | "arrival";
  handleCarriageTypeChange: (
    id: "first" | "second" | "third" | "fourth",
  ) => void;
}) {
  const seatsData = useSelector((state: RootState) => state.seats.data);
  const seatsFilters = useSelector((state: RootState) => state.seatsFilters);
  const {
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
  } = seatsFilters;

  const [showWarningModal, setShowWarningModal] = useState(false);

  const activeClassType = (() => {
    if (have_first_class) return "first";
    if (have_second_class) return "second";
    if (have_third_class) return "third";
    if (have_fourth_class) return "fourth";
    return "";
  })();

  const filteredCarriages = seatsData.filter((data) =>
    activeClassType ? data.coach.class_type === activeClassType : true,
  );

  const classMap = {
    first: "have_first_class",
    second: "have_second_class",
    third: "have_third_class",
    fourth: "have_fourth_class",
  } as const;

  const handleChooseCarriageType = (
    id: "first" | "second" | "third" | "fourth",
  ) => {
    handleCarriageTypeChange(id);
  };

  const types: { id: CarriageClassType; label: string; icon: JSX.Element }[] = [
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
                  seatsFilters[classMap[type.id]]
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
        {showWarningModal && (
          <Modal
            type="info"
            message="Выберите количество взрослых пассажиров, чтобы продолжить"
            onClick={() => setShowWarningModal(false)}
          />
        )}
      </section>
    </>
  );
}
