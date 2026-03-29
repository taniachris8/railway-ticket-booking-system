import { useNavigate } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../state/store";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { AsideWidget } from "../../components/passengers/aside-widget/AsideWidget";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import { InputGroup } from "../../components/input-group/InputGroup";

import styles from "./PaymentPage.module.css";
import { PassengerCheckbox } from "../../components/passengers/passenger-checkbox/PassengerCheckbox";

export function PaymentPage() {
  const navigate = useNavigate();
  const { last_name, first_name, patronymic, phone, email, payment_method } =
    useSelector((state: RootState) => state.passengers.user);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");

  const handleNavigateToPaymentClick = () => {
    navigate("/confirmation");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    //  добавить валидацию для каждого поля
  };

  return (
    <>
      <HeroSection
        image="/images/background2.png"
        containerClassName={styles.hero__payment_page}>
        <FindTicketsForm
          containerClassName={styles.find_tickets__payment_container}
          inputsDivClassName={styles.find_tickets__inputs__payment_page}
        />
      </HeroSection>

      <ProgressWidget stage="payment-page" />
      <section className={styles.payment}>
        <aside className={styles.payment__sidebar}>
          <AsideWidget />
        </aside>

        <main className={styles.payment__content}>
          <div className={styles.payment__details}>
            <div className={styles.payment__details_group}>
              <div className={styles.personal_info__header}>
                <h2 className={styles.title}>Персональные данные</h2>
              </div>
              <div className={styles.personal_info__content}>
                <div className={styles.name_inputs}>
                  <InputGroup
                    label="Фамилия"
                    id="last_name"
                    value={last_name}
                    onChange={(e) => handleChange(e)}
                  />
                  <InputGroup
                    label="Имя"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => handleChange(e)}
                  />
                  <InputGroup
                    label="Отчество"
                    id="patronymic"
                    value={patronymic}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.phone_input}>
                  <InputGroup
                    label="Контактный телефон"
                    id="patronymic"
                    value={patronymic}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.email_input}>
                  <InputGroup
                    label="E-mail"
                    id="email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                    placeholder="inbox@gmail.ru"
                  />
                </div>
              </div>
            </div>

            <div className={styles.payment__details_group}>
              <div className={styles.personal_info__header}>
                <h2 className={styles.title}>Способ оплаты</h2>
              </div>
              <div className={styles.personal_info__content}>
                <div className={styles.payment_method}>
                  <PassengerCheckbox text="Онлайн" />
                  <div className={styles.payment_options}>
                    <p className={styles.payment_option}>
                      Банковской
                      <br />
                      картой
                    </p>
                    <p className={styles.payment_option}>PayPal</p>
                    <p className={styles.payment_option}>Visa QIWI Wallet</p>
                  </div>
                </div>
                <div className={styles.payment_method}>
                  <PassengerCheckbox text="Наличными" />
                </div>
              </div>
            </div>
          </div>

          <Button
            className={styles.button}
            variant="more"
            text="Купить билеты"
            onClick={handleNavigateToPaymentClick}
          />
        </main>
        {showInfoModal && (
          <Modal
            type="info"
            message={infoModalMessage}
            onClick={() => setShowInfoModal(false)}
          />
        )}
      </section>
    </>
  );
}
