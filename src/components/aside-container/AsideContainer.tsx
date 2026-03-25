import styles from "./AsideContainer.module.css";

export function AsideContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className={styles.aside_container}>{children}</section>
    </>
  );
}
