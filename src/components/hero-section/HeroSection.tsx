import type { ReactNode } from "react";
import "./HeroSection.css"

type HeroSectionProps = {
  image: string;
  children: ReactNode;
  containerClassName: string;
};

export function HeroSection({
  image,
  children,
  containerClassName,
}: HeroSectionProps) {
  return (
    <>
      <section className={`hero ${containerClassName}`}>
        <img src={image} alt="Hero Image" className="hero__img" />
        <div className="hero__content">{children}</div>
      </section>
    </>
  );
}
