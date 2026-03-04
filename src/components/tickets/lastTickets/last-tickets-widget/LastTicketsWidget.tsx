import styles from "./LastTicketsWidget.module.css";
import { LastTicketCard } from "../last-ticket-card/LastTicketCard";
import { useState, useEffect } from "react";
import type { DirectionType } from "../../../../types";
import { fetchLastDirections } from "../../../../api/api";
import { getErrorMessage } from "../../../../utils/getErrorMessage";

export function LastTicketsWidget() {
  const [lastDirections, setLastDirections] = useState<DirectionType[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const loadLastDirections = async () => {
    try {
      setLoader(true);
      const lastDirections = await fetchLastDirections();
      if (lastDirections.length === 0) return;
      setLastDirections(lastDirections);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadLastDirections();
  }, []);

  return (
    <>
      <section className={styles["last-tickets"]}>
        <h3 className={styles["last-tickets__title"]}>последние билеты</h3>
        <div className={styles["last-tickets__list"]}>
          {loader && <div> Loading...</div>}
          {lastDirections.map((direction, index) => (
            <LastTicketCard direction={direction} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}
