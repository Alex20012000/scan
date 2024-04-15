import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img className="logo" src="./img/logoSkanWhite.svg" alt="logo_skan" />
      </div>
      <div className="footer__info">
        <p className="text">
          г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br />{" "}
          <a className="footer__link" href="info@skan.ru">
            info@skan.ru
          </a>
        </p>
        <p className="coopyright">Copyright. 2022</p>
      </div>
    </div>
  );
};

export default Footer;
