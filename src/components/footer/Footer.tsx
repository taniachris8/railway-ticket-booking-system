import "./Footer.css";
import { NavLink } from "react-router";
import { Button } from "../buttons/Button";
import { PhoneIcon } from "../../icons/PhoneIcon";
import { MailIcon } from "../../icons/MailIcon";
import { SkypeIcon } from "../../icons/SkypeIcons";
import { LocationIcon } from "../../icons/LocationIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { GmailIcon } from "../../icons/GmailIcon";
import { FacebookIcon } from "../../icons/FacebookIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { ScrollUpIcon } from "../../icons/ScrollUpIcon";

export function Footer() {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__details">
        <section id="contacts" className="footer__contacts">
          <h3 className="footer__title">Свяжитесь с нами</h3>
          <ul className="footer__contacts-list">
            <li className="footer__contact">
              <PhoneIcon className="footer__icon footer__icon__phone" />
              <span className="footer__contact-text">8 (800) 000 00 00</span>
            </li>
            <li className="footer__contact">
              <MailIcon className="footer__icon footer__icon__mail" />
              <span className="footer__contact-text">tu.train.tickets</span>
            </li>
            <li className="footer__contact">
              <SkypeIcon className="footer__icon footer__icon__skype" />
              <span className="footer__contact-text">inbox@mail.ru</span>
            </li>
            <li className="footer__contact">
              <LocationIcon className="footer__icon footer__icon__location" />
              <span className="footer__contact-text">
                г. Москва <br /> ул. Московская 27-35 <br /> 555 555
              </span>
            </li>
          </ul>
        </section>

        <div className="footer__subscribe">
          <ul className="footer__subscribe-list">
            <li className="footer__subscribe-item">
              <h3 className="footer__title">Подписка</h3>
              <form action="" className="footer__form">
                <label className="footer__label">Будьте в курсе событий</label>
                <div className="footer__form__group">
                  <input
                    type="text"
                    className="footer__input"
                    placeholder="email"
                  />
                  <Button variant="send" text="отправить" />
                </div>
              </form>
            </li>

            <li className="footer__subscribe-item">
              <h3 className="footer__title">Подписывайтесь на нас</h3>
              <div className="footer__social-media">
                <YoutubeIcon className="footer__icon-social footer__icon-social_youtube" />
                <LinkedInIcon className="footer__icon-social footer__icon-social_linkedin" />
                <GmailIcon className="footer__icon-social footer__icon-social_gmail" />

                <FacebookIcon className="footer__icon-social footer__icon-social_facebook" />

                <TwitterIcon className="footer__icon-social footer__icon-social_twitter" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__deco-line"></div>

      <div className="footer__lower-part">
        <NavLink className="footer__logo" to="/" onClick={handleScroll}>
          Лого
        </NavLink>
        <ScrollUpIcon
          className="footer__icon footer__scrollup-icon"
          onClick={handleScroll}
        />
        <time className="footer__date">{new Date().getFullYear()} WEB</time>
      </div>
    </footer>
  );
}
