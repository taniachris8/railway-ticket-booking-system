import { Button } from "./button/Button";

export function HowItWorks() {
  return (
    <>
      <section id="how-it-works" className="how-it-works">
        <div className="how-it-works__upper-block">
          <h4 className="how-it-works__title">Как это работает</h4>
          <Button variant="learn-more" text="Узнать больше" />
        </div>
        <div className="how-it-works__advantages">
          <div className="how-it-works__advantage">
            <div className="how-it-works__advantage__img-wrapper">
              <img src="/icons/Subtract1.png" alt="advantage" />
            </div>
            <p className="how-it-works__advantage__text">
              Удобный заказ <br /> на сайте
            </p>
          </div>
          <div className="how-it-works__advantage">
            <div className="how-it-works__advantage__img-wrapper">
              <img src="/icons/Subtract2.png" alt="advantage" />
            </div>
            <p className="how-it-works__advantage__text">
              Нет необходимости <br /> ехать в офис
            </p>
          </div>
          <div className="how-it-works__advantage">
            <div className="how-it-works__advantage__img-wrapper">
              <img src="/icons/Subtract3.png" alt="advantage" />
            </div>
            <p className="how-it-works__advantage__text">
              Огромный выбор <br /> направлений
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
