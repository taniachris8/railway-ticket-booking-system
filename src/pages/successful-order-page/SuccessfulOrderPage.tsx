import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

import type { RootState } from "../../state/store";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { Button } from "../../components/button/Button";
import { Price } from "../../components/price/Price";
import { StarIcon } from "../../icons/StarIcon";

import styles from "./SuccessfulOrderPage.module.css";

export function SuccessfulOrderPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(null);

  const { first_name, patronymic } = useSelector(
    (state: RootState) => state.passengers.user,
  );

  const handleBackToHomePage = () => {
    //сделать ресеты здесь?
    navigate("/");
  };

  const handleRateService = (index: number) => {
    setRating(index + 1);
  };

  return (
    <>
      <HeroSection
        image="/images/background3.png"
        containerClassName={styles.hero__successful_page}></HeroSection>

      <section className={styles.successful_order}>
        <main className={styles.successful_order_content}>
          <h3 className={styles.hero__title}>Благодарим Вас за заказ!</h3>
          <div className={styles.order_details}>
            <div className={styles.order_header}>
              <div className={styles.order_number}>№Заказа 285АА</div>
              <div className={styles.order_sum}>
                <p className={styles.order_sum_text}>сумма</p>
                <Price
                  amount={7760}
                  amountClassName={styles.amount}
                  iconClassName={styles.currency}
                />
              </div>
            </div>
            <div className={styles.order_body}>
              <div className={styles.order_icons}>
                <div className={styles.order_icon_group}>
                  <div className={styles.icon_wrapper}>
                    <img src="/icons/success-order-icon1.png"></img>
                  </div>
                  <p className={styles.icon_info}>
                    билеты будут
                    <br /> отправлены
                    <br /> на ваш <span>e-mail</span>
                  </p>
                </div>
                <div className={styles.order_icon_group}>
                  <div className={styles.icon_wrapper}>
                    <img src="/icons/success-order-icon2.png"></img>
                  </div>
                  <p className={styles.icon_info}>
                    <span>распечатайте</span>
                    <br /> и сохраняйте билеты <br />
                    до даты поездки
                  </p>
                </div>
                <div className={styles.order_icon_group}>
                  <div className={styles.icon_wrapper}>
                    <img src="/icons/success-order-icon3.png"></img>
                  </div>
                  <p className={styles.icon_info}>
                    <span>предьявите</span>
                    <br /> распечатанные <br />
                    билеты при посадке
                  </p>
                </div>
              </div>
              <div className={styles.order_message}>
                <div className={styles.success_message}>
                  <p className={styles.order_name}>
                    {first_name} {patronymic}!
                  </p>
                  <p className={styles.order_text}>
                    Ваш заказ успешно оформлен. <br />В ближайшее время с вами
                    свяжется наш оператор для подтверждения.
                  </p>
                  <p
                    className={`${styles.order_text} ${styles.order_text_bold}`}>
                    Благодарим Вас за оказанное доверие и желаем приятного
                    путешествия!
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.order_footer}>
              <div className={styles.rating}>
                <p className={styles.rating_text}>Оценить сервис</p>
                <div className={styles.rating_stars}>
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={
                        rating && index < rating
                          ? `${styles.star} ${styles.active}`
                          : `${styles.star}`
                      }
                      onClick={() => handleRateService(index)}
                    />
                  ))}
                </div>
              </div>
              <Button
                variant="change"
                text="вернуться на главную"
                className={styles.button}
                onClick={handleBackToHomePage}
              />
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
