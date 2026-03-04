import type { RootState } from "../../state/store";
import styles from "./ProgressBar.module.css";
import { useSelector } from "react-redux";

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
