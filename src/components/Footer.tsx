export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__details">
        <div className="footer__contacts">
          <h3 className="footer__title">Свяжитесь с нами</h3>
          <ul className="footer__contacts-list">
            <li className="footer__contact">
              <img
                src="/icons/phone.png"
                alt=""
                className="footer__icon footer__icon--phone"
              />
              <span className="footer__contact-text">8 (800) 000 00 00</span>
            </li>
            <li className="footer__contact">
              <img
                src="/icons/mail.png"
                alt=""
                className="footer__icon footer__icon--mail"
              />
              <span className="footer__contact-text">tu.train.tickets</span>
            </li>
            <li className="footer__contact">
              <img
                src="/icons/skype.png"
                alt=""
                className="footer__icon footer__icon--skype"
              />
              <span className="footer__contact-text">inbox@mail.ru</span>
            </li>
            <li className="footer__contact">
              <img
                src="/icons/Vector.png"
                alt=""
                className="footer__icon footer__icon--location"
              />
              <span className="footer__contact-text">
                г. Москва <br /> ул. Московская 27-35 <br /> 555 555
              </span>
            </li>
          </ul>
        </div>

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
                  <button className="footer__button">отправить</button>
                </div>
              </form>
            </li>

            <li className="footer__subscribe-item">
              <h3 className="footer__title">Подписывайтесь на нас</h3>
              <div className="footer__social-media">
                <img
                  src="/icons/youtube.png"
                  alt=""
                  className="footer__icon-social footer__icon-social_youtube"
                />
                <img
                  src="/icons/linkedin.png"
                  alt=""
                  className="footer__icon-social footer__icon-social_linkedin"
                />
                <img
                  src="/icons/gmail.png"
                  alt=""
                  className="footer__icon-social footer__icon-social_gmail"
                />
                <img
                  src="/icons/facebook.png"
                  alt=""
                  className="footer__icon-social footer__icon-social_facebook"
                />
                <img
                  src="/icons/twitter.png"
                  alt=""
                  className="footer__icon-social footer__icon-social_twitter"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__deco-line"></div>

      <div className="footer__lower-part">
        <p className="footer__logo">Лого</p>
        <img
          src="/icons/scrollup.png"
          alt="scroll up icon"
          className="footer__scrollup-icon"
        />
        <time className="footer__date">{new Date().getFullYear()} WEB</time>
      </div>
    </footer>
  );
}
