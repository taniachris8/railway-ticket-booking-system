import styles from "./CarriageTable.module.css";
import { Price } from "../../price/Price";
import { ConditionerIcon } from "../../../icons/additional-options/ConditionerIcon";
import { WiFiIcon } from "../../../icons/additional-options/WiFiIcon";
import { LinenIcon } from "../../../icons/additional-options/LinenIcon";
import { FoodIcon } from "../../../icons/additional-options/FoodIcon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import type { SeatsInfoType } from "../../../types";

type SeatType = { label: string; price: number; count?: number | null };

export function CarriageTable({ data, direction }: { data: SeatsInfoType; direction: "departure" | "arrival" }) {
  console.log("from carriage table:", data);

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

  
  const handleAddOption = (option: string) => { 
    
    if (option === 'have_wifi') {
      // Handle Wi-Fi option
    
    } else if (option === 'is_linens_included') {
      // Handle linens included option
    }
    
  }

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
               Обслуживание
               <span className={styles.service}>фпк</span>
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
                     <Tippy
                       theme="custom"
                       content="кондиционер"
                       placement="bottom"
                       offset={[0, 2]}>
                       <div>
                         <ConditionerIcon
                           className={
                             data.coach.have_air_conditioning
                               ? styles.icon__inactive
                               : styles.icon
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
                               ? styles.icon__inactive
                               : styles.icon
                           }
                           onClick={() => handleAddOption("have_wifi")}
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
                               ? styles.icon__inactive
                               : styles.icon
                           }
                           onClick={() => handleAddOption("is_linens_included")}
                         />
                       </div>
                     </Tippy>
                     <Tippy
                       theme="custom"
                       content="питание"
                       placement="bottom"
                       offset={[0, 2]}>
                       <div>
                         <FoodIcon
                           className={styles.icon}
                         />
                       </div>
                     </Tippy>
                   </div>
                 </td>
               )}
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   );
}
