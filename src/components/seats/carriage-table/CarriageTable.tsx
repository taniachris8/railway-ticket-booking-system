import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { SeatsInfoType } from "../../../types";
import type { RootState } from "../../../state/store";

import { setSeatsField } from "../../../state/reducers/seatsSlice";
import { selectTrainSeats } from "../../../state/selectors/seatSelectors";

import { Price } from "../../price/Price";
import { ConditionerIcon } from "../../../icons/additional-options/ConditionerIcon";
import { WiFiIcon } from "../../../icons/additional-options/WiFiIcon";
import { LinenIcon } from "../../../icons/additional-options/LinenIcon";
import { FoodIcon } from "../../../icons/additional-options/FoodIcon";
import { Modal } from "../../modal/Modal";

import styles from "./CarriageTable.module.css";

type SeatType = { label: string; price: number; count?: number | null };

export function CarriageTable({
  data,
  direction,
}: {
  data: SeatsInfoType;
  direction: "departure" | "arrival";
}) {
  const dispatch = useDispatch();
  const carriageState = useSelector((state: RootState) =>
    selectTrainSeats(state, direction),
  );

  const { class_type, side_price, top_price, bottom_price, price } = data.coach;

  let seatTypes: SeatType[] = [];

  if (class_type === "first" || class_type === "fourth") {
    seatTypes = [{ label: "", price: price! }];
  } else if (class_type === "second") {
    if (top_price && top_price > 0) {
      seatTypes.push({ label: "Верхние", price: top_price, count: 8 });
    }
    if (bottom_price && bottom_price > 0) {
      seatTypes.push({ label: "Нижние", price: bottom_price, count: 8 });
    }
  } else if (class_type === "third") {
    if (top_price && top_price > 0) {
      seatTypes.push({ label: "Верхние", price: top_price, count: 8 });
    }
    if (bottom_price && bottom_price > 0) {
      seatTypes.push({ label: "Нижние", price: bottom_price, count: 8 });
    }
    if (side_price && side_price > 0) {
      seatTypes.push({ label: "Боковые", price: side_price, count: 8 });
    }
  }

  const { wifiSelected, linenSelected, ACSelected, foodSelected } =
    carriageState;

  const options = [
    {
      name: "have_air_conditioning",
      label: "кондиционер",
      element: ConditionerIcon,
      selected: ACSelected,
    },
    {
      name: "have_wifi",
      label: "WI-FI",
      element: WiFiIcon,
      selected: wifiSelected,
    },
    {
      name: "is_linens_included",
      label: "белье",
      element: LinenIcon,
      selected: linenSelected,
    },
    {
      name: "is_food_included",
      label: "питание",
      element: FoodIcon,
      selected: foodSelected,
    },
  ];

  const [showOptionModal, setShowOptionModal] = useState(false);

  const toggleAddOption = (optionName: string) => {
    const isIncludedInCoach = Boolean(
      data.coach[optionName as keyof typeof data.coach],
    );

    if (isIncludedInCoach) {
      setShowOptionModal(true);
      return;
    }

    const newState = { ...carriageState };

    switch (optionName) {
      case "have_wifi":
        newState.wifiSelected = !carriageState.wifiSelected;
        newState.wifiPrice = newState.wifiSelected
          ? data.coach.wifi_price || 0
          : 0;
        break;
      case "is_linens_included":
        newState.linenSelected = !carriageState.linenSelected;
        newState.linenPrice = newState.linenSelected
          ? data.coach.linens_price || 0
          : 0;
        break;
      case "have_air_conditioning":
        newState.ACSelected = !carriageState.ACSelected;
        break;
      case "is_food_included":
        newState.foodSelected = !carriageState.foodSelected;
        break;
      default:
        break;
    }

    dispatch(
      setSeatsField({
        key: direction,
        value: newState,
      }),
    );
  };

  return (
    <div className={styles.carriage__table_wrapper}>
      <table className={styles.carriage__table}>
        <thead>
          <tr>
            <th>
              Места
              <span className={styles.total__count}>
                {data.coach.available_seats}
              </span>
            </th>
            <th>Стоимость</th>
            <th>
              Обслуживание<span className={styles.service}>фпк</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {seatTypes.map((seat, index) => (
            <tr key={index}>
              <td>
                <span className={styles.seats__type}>{seat.label}</span>
                <span className={styles.count}>{seat.count}</span>
              </td>
              <td>
                <Price
                  amount={seat.price}
                  amountClassName={styles.amount}
                  iconClassName={styles.currency}
                />
              </td>
              {index === 0 && (
                <td rowSpan={seatTypes.length}>
                  <div className={styles.icon__container}>
                    {options.map((option, i) => (
                      <Tippy
                        key={i}
                        theme="custom"
                        content={option.label}
                        placement="bottom"
                        offset={[0, 2]}>
                        <div>
                          <option.element
                            className={
                              data.coach[option.name as keyof typeof data.coach]
                                ? styles.icon__inactive
                                : option.selected
                                  ? styles.icon__selected
                                  : styles.icon
                            }
                            onClick={() => toggleAddOption(option.name)}
                          />
                        </div>
                      </Tippy>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showOptionModal && (
        <Modal
          type="info"
          message="Данная опция уже включена в стоимость билета"
          onClick={() => setShowOptionModal(false)}
        />
      )}
    </div>
  );
}
