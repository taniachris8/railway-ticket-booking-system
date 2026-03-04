import styles from "./ProgressWidget.module.css";

type ProgressWidgetProps = {
  stage: string;
}

export function ProgressWidget({ stage }: ProgressWidgetProps) {
  return (
    <>
      <ul className={styles.progress}>
        <li className={ `${styles.progress__item} ${stage === "tickets-page" && styles.active}` }>
          <div className={styles.progress__item__position}>1</div>
          <p className={styles.progress__item__name}>Билеты</p>
        </li>
        <li className={ `${styles.progress__item} ${stage === "passengers-page" && styles.active}` }>
          <div className={styles.progress__item__position}>2</div>
          <p className={styles.progress__item__name}>Пассажиры</p>
        </li>
        <li className={ `${styles.progress__item} ${stage === "payment-page" && styles.active}` }>
          <div className={styles.progress__item__position}>3</div>
          <p className={styles.progress__item__name}>Оплата</p>
        </li>
        <li className={ `${styles.progress__item} ${stage === "confirmation-page" && styles.active}` }>
          <div className={styles.progress__item__position}>4</div>
          <p className={styles.progress__item__name}>Проверка</p>
        </li>
      </ul>
    </>
  );
}

// beforeactive;
//  active
