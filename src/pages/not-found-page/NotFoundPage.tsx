import { useNavigate } from "react-router";
import { Button } from "../../components/button/Button";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Страница не найдена</h2>
        <p className={styles.description}>
          Извините, такая страница не найдена
        </p>
        <Button variant="more" text="На главную" onClick={handleClick} />
      </section>
    </>
  );
}
