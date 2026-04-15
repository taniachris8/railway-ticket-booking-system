import type { ReactNode } from "react";

import { getPublicAssetPath } from "../../utils/getPublicAssetPath";

import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  image: string;
  children?: ReactNode;
  containerClassName: string;
};

export function HeroSection({
  image,
  children,
  containerClassName,
}: HeroSectionProps) {
  return (
    <>
      <section className={`${styles.hero} ${containerClassName}`}>
        <img
          src={getPublicAssetPath(image)}
          alt="Hero Image"
          className={styles.hero__img}
        />
        <div className={styles.hero__content}>{children}</div>
      </section>
    </>
  );
}
