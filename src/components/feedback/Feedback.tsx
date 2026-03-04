import styles from "./Feedback.module.css";

export function Feedback() {
  return (
    <>
      <section id="feedback" className={styles.container}>
        <h4 className={styles.title}>отзывы</h4>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.image__wrapper}>
              <img
                src="/images/image3.png"
                alt="feedback image"
                className={styles.image}
              />
            </div>
            <div className={styles.text__wrapper}>
              <p className={styles.name}>Екатерина Вальнова</p>
              <p className={styles.text}>
                <span>“</span> Доброжелательные подсказки <br /> на всех этапах
                помогут правильно заполнить <br /> поля и без затруднений купить
                авиа или ж/д <br />
                билет, даже если вы заказываете онлайн билет <br /> впервые.
                <span> ”</span>
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.image__wrapper}>
              <img
                src="/images/image4.png"
                alt="feedback image"
                className={styles.image}
              />
            </div>

            <div className={styles.text__wrapper}>
              <p className={styles.name}>Евгений Стрыкало</p>
              <p className={styles.text}>
                <span>“</span> СМС-сопровождение до посадки <br /> Сразу после
                оплаты ж/д билетов <br /> и за 3 часа до отправления мы пришлем
                вам <br />
                СМС-напоминание о поездке.
                <span> ”</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.paging}>
          <span className={styles.active}></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </>
  );
}
