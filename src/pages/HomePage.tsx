import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AboutUs } from "../components/about-us/AboutUs";
import { Feedback } from "../components/feedback/Feedback";
import { HeroSection } from "../components/hero-section/HeroSection";
import { HowItWorks } from "../components/how-it-works/HowItWorks";
import { FindTicketsForm } from "../components/hero-section/FindTicketsForm";
import { ProgressBar } from "../components/progress-bar/ProgressBar";

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
        containerClassName="hero__home-page">
        <h3 className="hero__title">
          Вся жизнь - <br />
          <span>путешествие!</span>
        </h3>
        <FindTicketsForm
          containerClassName="find-tickets__home-container"
          inputsDivClassName="find-tickets__inputs__home-page"
        />
      </HeroSection>
      <ProgressBar />
      <AboutUs />
      <HowItWorks />
      <Feedback />
    </>
  );
}
