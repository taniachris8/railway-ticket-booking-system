import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AboutUs } from "../components/AboutUs";
import { Feedback } from "../components/Feedback";
import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { FindTicketsForm } from "../components/FindTicketsForm";
import { ProgressBar } from "../components/ProgressBar";

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
        image="/images/image.png"
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
