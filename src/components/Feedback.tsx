export function Feedback() {
  return (
    <>
      <section id="feedback" className="feedback">
        <h4 className="feedback__title">отзывы</h4>
        <div className="feedback__items">
          <div className="feedback__item">
            <div className="feedback__item__img-wrapper">
              <img
                src="/images/image3.png"
                alt="feedback image"
                className="feedback__item__image"
              />
            </div>
            <div className="feedback__item__text-wrapper">
              <p className="feedback__item__name">Екатерина Вальнова</p>
              <p className="feedback__item-text">
                <span>“</span> Доброжелательные подсказки <br /> на всех этапах
                помогут правильно заполнить <br /> поля и без затруднений купить
                авиа или ж/д <br />
                билет, даже если вы заказываете онлайн билет <br /> впервые.
                <span> ”</span>
              </p>
            </div>
          </div>
          <div className="feedback__item">
            <div className="feedback__item__img-wrapper">
              <img
                src="/images/image4.png"
                alt="feedback image"
                className="feedback__item__image"
              />
            </div>

            <div className="feedback__item__text-wrapper">
              <p className="feedback__item__name">Евгений Стрыкало</p>
              <p className="feedback__item-text">
                <span>“</span> СМС-сопровождение до посадки <br /> Сразу после
                оплаты ж/д билетов <br /> и за 3 часа до отправления мы пришлем
                вам <br />
                СМС-напоминание о поездке.
                <span> ”</span>
              </p>
            </div>
          </div>
        </div>
        <div className="feedback__dot-paging">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </>
  );
}
