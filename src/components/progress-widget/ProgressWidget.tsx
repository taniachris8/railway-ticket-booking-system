import styles from "./ProgressWidget.module.css";

type ProgressWidgetProps = {
  stage: string;
};

export function ProgressWidget({ stage }: ProgressWidgetProps) {
  const stages = [
    { name: "tickets-page", label: "Билеты" },
    { name: "passengers-page", label: "Пассажиры" },
    { name: "payment-page", label: "Оплата" },
    { name: "confirmation-page", label: "Проверка" },
  ];

  const currentStageIndex = stages.findIndex((s) => s.name === stage);

  return (
    <>
      <ul className={styles.progress}>
        {stages.map((stageItem, index) => {
          const isActive = index === currentStageIndex;
          const isBeforeActive = index === currentStageIndex - 1;

          return (
            <li
              key={stageItem.name}
              className={`${styles.progress__item} 
              ${isActive ? styles.active : ""} 
              ${isBeforeActive ? styles.beforeactive : ""}`}>
              <div className={styles.progress__item__position}>{index + 1}</div>
              <p className={styles.progress__item__name}>{stageItem.label}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
