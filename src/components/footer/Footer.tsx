import { NavLink } from "react-router";
import { useState } from "react";

import { subscribe } from "../../api/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

import { Button } from "../button/Button";
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

import styles from "./Footer.module.css";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const subscribeForNews = async () => {
    try {
      setLoader(true);
      const response = await subscribe(email);
      if ("status" in response && response.status) {
        setEmail("");
        setSuccessMessage("Вы успешно подписаны на наши новости!");
      }
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setLoader(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (validEmail) {
      subscribeForNews();
      setErrorMessage("");
    } else {
      setErrorMessage("Введите корректный имейл, например, inbox.gmail.com");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.details}>
        <section id="contacts" className={styles.contacts}>
          <h3 className={styles.title}>Свяжитесь с нами</h3>
          <ul className={styles.contacts__list}>
            <li className={styles.contact__item}>
              <PhoneIcon className={`${styles.icon} ${styles.phone}`} />
              <span className={styles.contact__text}>8 (800) 000 00 00</span>
            </li>
            <li className={styles.contact__item}>
              <MailIcon className={`${styles.icon} ${styles.mail}`} />
              <span className={styles.contact__text}>tu.train.tickets</span>
            </li>
            <li className={styles.contact__item}>
              <SkypeIcon className={`${styles.icon} ${styles.skype}`} />
              <span className={styles.contact__text}>inbox@mail.ru</span>
            </li>
            <li className={styles.contact__item}>
              <LocationIcon className={`${styles.icon} ${styles.location}`} />
              <span className={styles.contact__text}>
                г. Москва <br /> ул. Московская 27-35 <br /> 555 555
              </span>
            </li>
          </ul>
        </section>

        <div className={styles.subscribe}>
          <ul className={styles.subscribe__list}>
            <li className={styles.subscribe__item}>
              <h3 className={styles.title}>Подписка</h3>
              <form
                action=""
                className={styles.form}
                onSubmit={handleSubscribe}>
                <label className={styles.label}>Будьте в курсе событий</label>

                <>
                  <div className={styles.group}>
                    {loader ? (
                      <p className={styles.loader}>
                        Идёт загрузка, подождите...
                      </p>
                    ) : (
                      <>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => {
                            setErrorMessage("");
                            setSuccessMessage("");
                          }}
                        />
                        <Button variant="send" text="отправить" />
                      </>
                    )}
                  </div>
                  <p
                    className={
                      errorMessage
                        ? `${styles.error_message}`
                        : successMessage
                          ? `${styles.success_message}`
                          : `${styles.message}`
                    }>
                    {errorMessage
                      ? errorMessage
                      : successMessage
                        ? successMessage
                        : ""}
                  </p>
                </>
              </form>
            </li>

            <li className={styles.subscribe__item}>
              <h3 className={styles.title}>Подписывайтесь на нас</h3>
              <div className={styles.social}>
                <YoutubeIcon
                  className={`${styles.icon__social} ${styles.youtube}`}
                />
                <LinkedInIcon
                  className={`${styles.icon__social} ${styles.linkedIn}`}
                />
                <GmailIcon
                  className={`${styles.icon__social} ${styles.gmail}`}
                />

                <FacebookIcon
                  className={`${styles.icon__social} ${styles.facebook}`}
                />

                <TwitterIcon
                  className={`${styles.icon__social} ${styles.twitter}`}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.line}></div>

      <div className={styles.lower__part}>
        <NavLink className={styles.logo} to="/" onClick={handleScroll}>
          Лого
        </NavLink>
        <ScrollUpIcon
          className={`${styles.icon} ${styles.scrollup}`}
          onClick={handleScroll}
        />
        <time className={styles.date}>{new Date().getFullYear()} WEB</time>
      </div>
    </footer>
  );
}
