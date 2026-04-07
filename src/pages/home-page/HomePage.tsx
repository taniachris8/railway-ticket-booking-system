import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../state/store";

import { AboutUs } from "../../components/about-us/AboutUs";
import { Feedback } from "../../components/feedback/Feedback";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { HowItWorks } from "../../components/how-it-works/HowItWorks";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
import { Modal } from "../../components/modal/Modal";

import styles from "./HomePage.module.css";

export function HomePage() {
  const location = useLocation();

  const error = useSelector((state: RootState) => state.cities.error);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection
        image="/images/background1.png"
        containerClassName={styles.hero__home}>
        <h3 className={styles.hero__title}>
          Вся жизнь - <br />
          <span>путешествие!</span>
        </h3>
        <FindTicketsForm
          containerClassName={styles.find__tickets}
          inputsDivClassName={styles.find__tickets_inputs}
        />
      </HeroSection>
      <AboutUs />
      <HowItWorks />
      <Feedback />
      {showErrorModal && (
        <Modal
          type="error"
          message="Не удалось загрузить список городов. Проверьте настройки подключения к Интернету или попробуйте позже."
          onClick={() => setShowErrorModal(false)}></Modal>
      )}
    </>
  );
}
