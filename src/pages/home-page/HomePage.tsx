import styles from "./HomePage.module.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AboutUs } from "../../components/about-us/AboutUs";
import { Feedback } from "../../components/feedback/Feedback";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { HowItWorks } from "../../components/how-it-works/HowItWorks";
import { FindTicketsForm } from "../../components/find-tickets-form/FindTicketsForm";
export function HomePage() {
  const location = useLocation();

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
        containerClassName={ styles.hero__home }>
        <h3 className={ styles.hero__title }>
          Вся жизнь - <br />
          <span>путешествие!</span>
        </h3>
        <FindTicketsForm
          containerClassName={ styles.find__tickets }
          inputsDivClassName={ styles.find__tickets_inputs }
        />
      </HeroSection>
      <AboutUs />
      <HowItWorks />
      <Feedback />
    </>
  );
}
