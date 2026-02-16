import type { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

type HeroSectionProps = {
  image: string;
  children: ReactNode;
};

export function HeroSection({ image, children }: HeroSectionProps) {
  return (
    <>
      <section className="hero">
        <img src={image} alt="Hero Image" className="hero__img" />
        <div className="hero__content">{children}</div>
      </section>
      <ProgressBar />
    </>
  );
}
