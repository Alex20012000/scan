import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/authorization/authorizationSlice";
import "../styles/header.css";

const Header = () => {
  const authorization = useSelector((state) => state.user.authorization);
  const showLoader = useSelector((state) => state.user.loader);
  const usedCompanyCount = useSelector((state) => state.user.usedCompanyCount);
  const companyLimit = useSelector((state) => state.user.companyLimit);
  const dispatch = useDispatch();

  const handleClickLogout = (e) => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <img className="header__logo" src="./img/logoSkan.svg" alt="logo_skan" />
      <div className="header__links">
        <ul className="links">
          <li className="link">
            <a href="#1">FAQ</a>
          </li>
          <li className="link">
            <a href="#1">Главная</a>
          </li>
          <li className="link">
            <a href="#1">Тарифы</a>
          </li>
        </ul>
      </div>
      {authorization ? (
        <div className="company__main-info">
          <div className={showLoader ? "company_info_center" : "company__info"}>
            {showLoader ? (
              <img
                className="company__info-loader"
                src="./img/LoaderHeader.png"
                alt="header-loaderimg"
              />
            ) : (
              <div>
                <p className="company__info-text">
                  Использовано компаний: {usedCompanyCount}
                </p>
                <p className="company__info-text">
                  Лимит по компаниям: {companyLimit}
                </p>
              </div>
            )}
          </div>
          <div className="user__info">
            <div className="user__info-panel">
              <p className="user__name">Алексей А.</p>
              <button
                onClick={(e) => handleClickLogout(e)}
                className="header__exit-btn"
              >
                Выйти
              </button>
            </div>
            <img
              className="user__avatar"
              src="./img/avatar.svg"
              alt="avatar-user"
            />
          </div>
        </div>
      ) : (
        <div className="header__buttons">
          <button className="login__btn" type="button">
            <Link to="/login_page">Вход</Link>
          </button>
          <button className="register__btn" type="button">
            <a href="#1">Зарегистрироваться</a>
          </button>
        </div>
      )}
      <div className="header__burger-menu">
        <img src="/img/BurgerIcon.svg" alt="burger-icon" />
      </div>
    </div>
  );
};

export default Header;
