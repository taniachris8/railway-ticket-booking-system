import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../state/store";
import { submitOrderRequest } from "../../state/reducers/orderSlice";

import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import { resetSearchStateAction } from "../../state/actions/resetSearch";
import { resetPassengersStateAction } from "../../state/actions/resetPassengers";

import { HeroSection } from "../../components/hero-section/HeroSection";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { ProgressWidget } from "../../components/progress-widget/ProgressWidget";
import { AsideWidget } from "../../components/passengers/aside-widget/AsideWidget";
import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";
import { Price } from "../../components/price/Price";
import { Loader } from "../../components/loader/Loader";

import { TicketCard } from "../../components/tickets/ticket-card/TicketCard";
import { ConfirmationPassenger } from "../../components/confirmation/confirmation-passenger/ConfirmationPassenger";

import styles from "./ConfirmationPage.module.css";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ticket = useSelector((state: RootState) => state.seats.ticket);
  const passengers = useSelector(
    (state: RootState) => state.passengers.departure.seats,
  );
  const payment_method = useSelector(
    (state: RootState) => state.passengers.user.payment_method,
  );

  const { first_name, patronymic } = useSelector(
    (state: RootState) => state.passengers.user,
  );

  const selectedCoaches = useSelector(
    (state: RootState) => state.seats.departure.selectedSeats,
  );
  const seats = Object.values(selectedCoaches);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const { loading, data, error } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleChangePassengersInfo = () => {
    navigate("/passengers");
  };

  const handleChangePaymentMethod = () => {
    navigate("/payment");
  };

  const handleSubmitOrder = () => {
    dispatch(submitOrderRequest());
    if (data && data.status) {
      const savedUser = { first_name, patronymic };
      const savedSeats = seats;

      dispatch(resetPassengersStateAction());
      dispatch(resetSearchStateAction());

      navigate("/successful-order", {
        state: { user: savedUser, seats: savedSeats },
      });
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <HeroSection
        image="/images/background2.png"
        containerClassName={styles.hero__confirmation_page}>
        <FindTicketsForm
          containerClassName={styles.find_tickets__confirmation_container}
          inputsDivClassName={styles.find_tickets__inputs__confirmation_page}
        />
      </HeroSection>
      {loading && <Loader />}

      <ProgressWidget stage="confirmation-page" />
      <section className={styles.confirmation}>
        <aside className={styles.confirmation__sidebar}>
          <AsideWidget />
        </aside>

        <main className={styles.confirmation__content}>
          <div className={styles.confirmation_item}>
            <div className={styles.item_header}>
              <h2 className={styles.item_title}>Поезд</h2>
            </div>
            <div className={styles.item_content}>
              <TicketCard ticket={ticket} />
            </div>
          </div>
          <div className={styles.confirmation_item}>
            <div className={styles.item_header}>
              <h2 className={styles.item_title}>Пассажиры</h2>
            </div>
            <div className={styles.passengers_content}>
              <div className={styles.passengers}>
                {passengers.map((passenger, index) => (
                  <ConfirmationPassenger key={index} passenger={passenger} />
                ))}
              </div>
              <div className={styles.total_price}>
                <div className={styles.total_price_value}>
                  <p className={styles.total_price_label}>Всего</p>
                  <Price
                    amount={calculateTotalPrice(seats)}
                    amountClassName={styles.total_price_amount}
                    iconClassName={styles.total_price_icon}
                  />
                </div>
                <Button
                  text="Изменить"
                  variant="change"
                  className="passengers_button"
                  onClick={handleChangePassengersInfo}
                />
              </div>
            </div>
          </div>

          <div className={styles.confirmation_item}>
            <div className={styles.item_header}>
              <h2 className={styles.item_title}>Способ оплаты</h2>
            </div>
            <div className={styles.payment_method_content}>
              <div className={styles.payment_method}>
                <p className={styles.payment_method_chosen}>
                  {payment_method === "online" ? "Онлайн" : "Наличными"}
                </p>
              </div>
              <div className={styles.button_wrapper}>
                <Button
                  variant="change"
                  text="Изменить"
                  className={styles.payment_method_button}
                  onClick={handleChangePaymentMethod}
                />
              </div>
            </div>
          </div>
          <Button
            className={styles.button}
            variant="more"
            text="подтвердить"
            onClick={handleSubmitOrder}
          />
        </main>
        {showErrorModal && (
          <Modal
            message="Возникла ошибка при оформлении заказа. Проверьте подключение к Интернету или попробуйте позже."
            type="error"
            onClick={() => setShowErrorModal(false)}
          />
        )}
      </section>
    </>
  );
}
