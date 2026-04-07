import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";

import type { RootState } from "../../state/store";

import { setUserField } from "../../state/reducers/passengersSlice";
import { validateName } from "../../utils/validatePersonsInfo";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { AsideWidget } from "../../components/passengers/aside-widget/AsideWidget";
import { Button } from "../../components/button/Button";
import { InputGroup } from "../../components/input-group/InputGroup";
import { PassengerCheckbox } from "../../components/passengers/passenger-checkbox/PassengerCheckbox";

import styles from "./PaymentPage.module.css";

export function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { last_name, first_name, patronymic, phone, email, payment_method } =
    useSelector((state: RootState) => state.passengers.user);

  const [onlinePaymentOption, setOnlinePaymentOption] = useState<
    "bank_card" | "paypal" | "qiwi_wallet" | null
  >(null);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [patronymicError, setPatronymicError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const handleNavigateToPaymentClick = () => {
    const validName = validateName(first_name);
    const validLastName = validateName(last_name);
    const validPatronymic = validateName(patronymic);
    const validPhone = /^\d{10}$/.test(phone) && !/^0{10}$/.test(phone);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (
      validName &&
      validLastName &&
      validPatronymic &&
      validPhone &&
      validEmail &&
      payment_method
    ) {
      navigate("/confirmation");
    } else {
      if (!validName) {
        setFirstNameError("Введите корректное имя");
      }
      if (!validLastName) {
        setLastNameError("Введите корректную фамилию");
      }
      if (!validPatronymic) {
        setPatronymicError("Введите корректное отчество");
      }
      if (!validPhone) {
        setPhoneError("Введите корректный номер телефона");
      }
      if (!validEmail) {
        setEmailError("Введите корректный email");
      }
      if (!payment_method) {
        setPaymentMethodError("Пожалуйста, выберите способ оплаты");
      }
    }
  };

  const handleChangeOnlinePaymentOption = (
    option: "bank_card" | "paypal" | "qiwi_wallet",
  ) => {
    setOnlinePaymentOption(option);
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
            <div
              className={`${styles.payment__details_group} ${styles.user_info}`}>
              <div className={styles.personal_info__header}>
                <h2 className={styles.title}>Персональные данные</h2>
              </div>
              <div className={styles.personal_info__content}>
                <div className={styles.name_inputs}>
                  <InputGroup
                    label="Фамилия"
                    id="last_name"
                    value={last_name}
                    onChange={(e) =>
                      dispatch(
                        setUserField({
                          key: "last_name",
                          value: e.target.value,
                        }),
                      )
                    }
                    error={lastNameError}
                    onFocus={() => setLastNameError("")}
                  />
                  <InputGroup
                    label="Имя"
                    id="first_name"
                    value={first_name}
                    onChange={(e) =>
                      dispatch(
                        setUserField({
                          key: "first_name",
                          value: e.target.value,
                        }),
                      )
                    }
                    error={firstNameError}
                    onFocus={() => setFirstNameError("")}
                  />
                  <InputGroup
                    label="Отчество"
                    id="patronymic"
                    value={patronymic}
                    onChange={(e) =>
                      dispatch(
                        setUserField({
                          key: "patronymic",
                          value: e.target.value,
                        }),
                      )
                    }
                    error={patronymicError}
                    onFocus={() => setPatronymicError("")}
                  />
                </div>
                <div className={styles.phone_input}>
                  <div className={styles.input_group}>
                    <label className={styles.label}>Номер</label>
                    <div className={styles.input_wrapper}>
                      <IMaskInput
                        className={
                          !phoneError
                            ? `${styles.input} ${
                                phone.length === 10
                                  ? styles.filled
                                  : `${styles.input}`
                              }`
                            : `${styles.input} ${styles.input_with_error}`
                        }
                        mask="+7 000 000 00 00"
                        lazy={false}
                        placeholderChar="_"
                        overwrite
                        unmask={true}
                        value={phone}
                        onAccept={(value) =>
                          dispatch(setUserField({ key: "phone", value: value }))
                        }
                        onFocus={() => setPhoneError("")}
                      />
                      <span
                        className={`${styles.error} ${phoneError ? "" : "hidden"}`}>
                        {phoneError}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.email_input}>
                  <InputGroup
                    label="E-mail"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      dispatch(
                        setUserField({ key: "email", value: e.target.value }),
                      )
                    }
                    placeholder="inbox@gmail.ru"
                    error={emailError}
                    onFocus={() => setEmailError("")}
                  />
                </div>
              </div>
            </div>

            <div className={styles.payment__details_group}>
              <div className={styles.personal_info__header}>
                <h2 className={styles.title}>Способ оплаты</h2>
              </div>
              <div className={styles.payment__content}>
                <div className={styles.payment_method}>
                  <PassengerCheckbox
                    text="Онлайн"
                    containerClassName={styles.checkbox_container}
                    textClassName={styles.checkbox_text}
                    checked={payment_method === "online"}
                    onChange={(checked) =>
                      dispatch(
                        setUserField({
                          key: "payment_method",
                          value: checked ? "online" : "",
                        }),
                        setPaymentMethodError(""),
                      )
                    }
                  />
                  <div className={styles.payment_options}>
                    <p
                      className={
                        onlinePaymentOption === "bank_card"
                          ? `${styles.payment_option} ${styles.payment_option_active}`
                          : styles.payment_option
                      }
                      onClick={() =>
                        handleChangeOnlinePaymentOption("bank_card")
                      }>
                      Банковской
                      <br />
                      картой
                    </p>
                    <p
                      className={
                        onlinePaymentOption === "paypal"
                          ? `${styles.payment_option} ${styles.payment_option_active}`
                          : styles.payment_option
                      }
                      onClick={() => handleChangeOnlinePaymentOption("paypal")}>
                      PayPal
                    </p>
                    <p
                      className={
                        onlinePaymentOption === "qiwi_wallet"
                          ? `${styles.payment_option} ${styles.payment_option_active}`
                          : styles.payment_option
                      }
                      onClick={() =>
                        handleChangeOnlinePaymentOption("qiwi_wallet")
                      }>
                      Visa QIWI Wallet
                    </p>
                  </div>
                </div>
                <div className={styles.payment_method}>
                  <PassengerCheckbox
                    text="Наличными"
                    containerClassName={styles.checkbox_container}
                    textClassName={styles.checkbox_text}
                    checked={payment_method === "cash"}
                    onChange={(checked) =>
                      dispatch(
                        setUserField({
                          key: "payment_method",
                          value: checked ? "cash" : "",
                        }),
                        setPaymentMethodError(""),
                      )
                    }
                  />
                  {paymentMethodError && (
                    <p className={styles.error}>{paymentMethodError}</p>
                  )}
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
      </section>
    </>
  );
}
