import { WarningIcon } from "../../icons/WarningIcon";
import { ErrorIcon } from "../../icons/ErrorIcon";

import styles from "./Modal.module.css";

type ModalProps = {
  message: string;
  onClick?: () => void;
  type: "info" | "error";
};

export function Modal({ message, onClick, type }: ModalProps) {
  return (
    <>
      <div className={styles.overlay}>
        <section className={styles.modal}>
          <div
            className={
              type === "info"
                ? `${styles.modal__header} ${styles.modal__header_warning}`
                : `${styles.modal__header} ${styles.modal__header_error}`
            }>
            {type === "info" ? (
              <WarningIcon className={styles.modal__icon} />
            ) : (
              <ErrorIcon className={styles.modal__icon} />
            )}
          </div>
          <div className={styles.modal__body}>
            <p className={styles.modal__message}>{message}</p>
          </div>
          <div className={styles.modal__footer}>
            <button className={styles.modal__button} onClick={onClick}>
              Понятно
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
