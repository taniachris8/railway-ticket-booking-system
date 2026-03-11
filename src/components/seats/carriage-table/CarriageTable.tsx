import styles from "./CarriageTable.module.css";
import { Price } from "../../price/Price";
import { ConditionerIcon } from "../../../icons/additional-options/ConditionerIcon";
import { WiFiIcon } from "../../../icons/additional-options/WiFiIcon";
import { LinenIcon } from "../../../icons/additional-options/LinenIcon";
import { FoodIcon } from "../../../icons/additional-options/FoodIcon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import type { SeatsInfoType } from "../../../types";

export function CarriageTable({ data }: { data: SeatsInfoType }) {
  return (
    <>
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
                Обслуживание
                <span className={styles.service}>фпк</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={styles.seats__type}>Верхние</span>
                <span className={styles.count}>8</span>
              </td>
              <td>
                <Price
                  amount={data.coach.top_price}
                  amountClassName={styles.amount}
                  iconClassName={styles.currency}
                />
              </td>
              <td>
                <div className={styles.icon__container}>
                  <Tippy
                    theme="custom"
                    content="кондиционер"
                    placement="bottom"
                    offset={[0, 2]}>
                    <div>
                      <ConditionerIcon
                        className={
                          data.coach.have_air_conditioning
                            ? styles.icon
                            : styles.icon__inactive
                        }
                      />
                    </div>
                  </Tippy>
                  <Tippy
                    theme="custom"
                    content="WI-FI"
                    placement="bottom"
                    offset={[0, 2]}>
                    <div>
                      <WiFiIcon
                        className={
                          data.coach.have_wifi
                            ? styles.icon
                            : styles.icon__inactive
                        }
                      />
                    </div>
                  </Tippy>
                  <Tippy
                    theme="custom"
                    content="белье"
                    placement="bottom"
                    offset={[0, 2]}>
                    <div>
                      <LinenIcon
                        className={
                          data.coach.is_linens_included
                            ? styles.icon
                            : styles.icon__inactive
                        }
                      />
                    </div>
                  </Tippy>
                  <Tippy
                    theme="custom"
                    content="питание"
                    placement="bottom"
                    offset={[0, 2]}>
                    <div>
                      <FoodIcon className={styles.icon} />
                    </div>
                  </Tippy>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className={styles.seats__type}>Нижние</span>
                <span className={styles.count}>8</span>
              </td>
              <td>
                <Price
                  amount={data.coach.bottom_price}
                  amountClassName={styles.amount}
                  iconClassName={styles.currency}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
