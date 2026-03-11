import styles from "./CarriagePlan.module.css";
import type { SeatType } from "../../../types";
import { useState } from "react";
import { ThirdClassCarriagePlan } from "../carriage-plans/ThirdClassCarriagePlan";
import { FirstClassCarriagePlan } from "../carriage-plans/FirstClassCarriagePlan";
import { FourthClassCarriagePlan } from "../carriage-plans/FourthClassCarriagePlan";
import { SecondClassCarriagePlan } from "../carriage-plans/SecondClassCarriagePlan";

type CarriagePlanProps = {
  availableSeats: SeatType[];
  classType: string;
};

export function CarriagePlan({ availableSeats, classType}: CarriagePlanProps) {
   const [selected, setSelected] = useState<number | null>(null);

   const availableSeatIndexes = new Set(
     availableSeats.filter((seat) => seat.available).map((seat) => seat.index),
   );

   const isSeatAvailable = (seatNumber: number) => {
     return availableSeatIndexes.has(seatNumber);
   };

   const handleSelectSeat = (seatNumber: number) => {
     console.log("seat", seatNumber);

     if (selected === seatNumber) {
       setSelected(null);
     } else {
       setSelected(seatNumber);
     }
  };
  
 
  return (
    <div className={styles.carriage__plan}>
      {classType === "first" && (
        <FirstClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
        />
      )}
      {classType === "second" && (
        <SecondClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
        />
      )}
      {classType === "third" && (
        <ThirdClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
        />
        // <FourthClassCarriagePlan
        //   isSeatAvailable={isSeatAvailable}
        //   handleSelectSeat={handleSelectSeat}
        //   selected={selected}
        // />
      )}
      {classType === "fourth" && (
        <FourthClassCarriagePlan
          isSeatAvailable={isSeatAvailable}
          handleSelectSeat={handleSelectSeat}
          selected={selected}
        />
      )}

      <div className={styles.clients__online}>
        11 человек выбирают места в этом поезде
      </div>
    </div>
  );
}
