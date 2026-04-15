import { Button } from "../button/Button";
import { getPublicAssetPath } from "../../utils/getPublicAssetPath";

import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <>
      <section id="how-it-works" className={styles.container}>
        <div className={styles.upper__block}>
          <h4 className={styles.title}>Как это работает</h4>
          <Button variant="learn-more" text="Узнать больше" />
        </div>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <div className={styles.image__wrapper}>
              <img
                src={getPublicAssetPath("/icons/Subtract1.png")}
                alt="advantage"
              />
            </div>
            <p className={styles.text}>
              Удобный заказ <br /> на сайте
            </p>
          </div>
          <div className={styles.advantage}>
            <div className={styles.image__wrapper}>
              <img
                src={getPublicAssetPath("/icons/Subtract2.png")}
                alt="advantage"
              />
            </div>
            <p className={styles.text}>
              Нет необходимости <br /> ехать в офис
            </p>
          </div>
          <div className={styles.advantage}>
            <div className={styles.image__wrapper}>
              <img
                src={getPublicAssetPath("/icons/Subtract3.png")}
                alt="advantage"
              />
            </div>
            <p className={styles.text}>
              Огромный выбор <br /> направлений
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
