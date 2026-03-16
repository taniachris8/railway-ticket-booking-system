import { ProgressBar } from "../progress-bar/ProgressBar";

import styles from "./Loader.module.css";

export function Loader() {
  return (
    <>
      <ProgressBar />
      <section className={styles.loader}>
        <h5 className={styles.loader__title}>идет поиск</h5>
      </section>
    </>
  );
}
