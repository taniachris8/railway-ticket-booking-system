import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AboutUs } from "../components/AboutUs";
import { Feedback } from "../components/Feedback";
import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { FindTicketsForm } from "../components/FindTicketsForm";

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
      <HeroSection image="/images/image.png">
        <h3 className="hero__title">
          Вся жизнь - <br />
          <span>путешествие!</span>
        </h3>
        <FindTicketsForm/>
      </HeroSection>
      <section id="about">
        <AboutUs />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="feedback">
        <Feedback />
      </section>
    </>
  );
}
