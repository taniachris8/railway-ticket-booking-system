import { WarningIcon } from "../../icons/WarningIcon";
import { ErrorIcon } from "../../icons/ErrorIcon";

import styles from "./Module.module.css";

type ModuleProps = {
  message: string;
  onClick?: () => void;
  type: "info" | "error";
};

export function Module({ message, onClick, type }: ModuleProps) {
  return (
    <>
      <div className={styles.overlay}>
        <section className={styles.module}>
          <div
            className={
              type === "info"
                ? `${styles.module__header} ${styles.module__header_warning}`
                : `${styles.module__header} ${styles.module__header_error}`
            }>
            {type === "info" ? (
              <WarningIcon className={styles.module__icon} />
            ) : (
              <ErrorIcon className={styles.module__icon} />
            )}
          </div>
          <div className={styles.module__body}>
            <p className={styles.module__message}>{message}</p>
          </div>
          <div className={styles.module__footer}>
            <button className={styles.module__button} onClick={onClick}>
              Понятно
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
