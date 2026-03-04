import styles from "./AboutUs.module.css";

export function AboutUs() {
  return (
    <>
      <section id="about" className={styles.container}>
        <h4 className={styles.title}>о нас</h4>
        <div className={styles.content}>
          <div className={styles.line}></div>
          <div className={styles.text}>
            <p>
              Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы
              наблюдаем, как с каждым днем <br /> все больше людей заказывают жд
              билеты через интернет.
            </p>
            <p>
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2
              клика, но стоит ли это делать? <br /> Мы расскажем о преимуществах
              заказа через интернет.
            </p>
            <p>
              Покупать жд билеты дешево можно за 90 суток до отправления поезда.{" "}
              <br />
              Благодаря динамическому ценообразованию цена на билеты в это время
              самая низкая.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
