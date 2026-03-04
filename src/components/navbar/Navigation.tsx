import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

export function Navigation() {
  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <div className={styles.logo__wrapper}>
            <NavLink className={styles.logo} to="/">
              Лого
            </NavLink>
          </div>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}>
              <NavLink className={styles.navbar__link} to="/#about">
                О нас
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink className={styles.navbar__link} to="/#how-it-works">
                Как это работает
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink className={styles.navbar__link} to="/#feedback">
                Отзывы
              </NavLink>
            </li>
            <li className={styles.navbar__item}>
              <NavLink className={styles.navbar__link} to="/#contacts">
                Контакты
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
