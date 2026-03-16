import { useSelector } from "react-redux";

import type { RootState } from "../../state/store";

import styles from "./ProgressBar.module.css";

export function ProgressBar() {
  const progress = useSelector((state: RootState) => state.tickets.progress);

  return (
    <div className={styles.progress__bar}>
      <div
        className={styles.progress__bar__fill}
        style={{ width: `${progress}%` }}></div>
    </div>
  );
}
