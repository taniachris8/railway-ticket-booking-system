import { NavLink } from "react-router";
import "./Navigation.css"

export function Navigation() {
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar__logo-wrapper">
            <NavLink className="navbar__logo" to="/">
              Лого
            </NavLink>
          </div>
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/#about">
                О нас
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/#how-it-works">
                Как это работает
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/#feedback">
                Отзывы
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/#contacts">
                Контакты
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
