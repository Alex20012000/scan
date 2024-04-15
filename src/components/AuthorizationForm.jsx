import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getUserInfo,
  changePassOrLogin,
} from "../features/authorization/authorizationSlice";

function AuthorizationForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(getUser({ login, password }));
      if (data.payload) {
        dispatch(getUserInfo(data.payload.data.accessToken));
        navigate("/home");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleChangeLoginAndPass = (e, loginOrPassword) => {
    dispatch(changePassOrLogin(false));
    const value = e.target.value;
    if (loginOrPassword === "login") {
      return setLogin(value);
    }

    setPassword(value);
  };

  return (
    <form className="authorization__main-form">
      <img className="authorization__icon" src="./img/Lock.svg" alt="" />
      <div className="authorization__section-2">
        <div className="authorization__btns">
          <a href="#1">
            <button type="button" className="btn__authorization-login">
              Войти
            </button>
          </a>
          <a href="#1">
            <button className="btn__authorization-register">
              Зарегистрироваться
            </button>
          </a>
        </div>
        <div>
          <p className="authorization__input-login">
            Логин или номер телефона:
          </p>
          <input
            value={login}
            onChange={(e) => handleChangeLoginAndPass(e, "login")}
            className={
              error ? "authorization__input-failed" : "authorization__input"
            }
            type="text"
            required
          />
          <p className="authorization__input-pass">Пароль:</p>
          <input
            value={password}
            onChange={(e) => handleChangeLoginAndPass(e, "password")}
            className={
              error ? "authorization__input-failed" : "authorization__input"
            }
            type="password"
            required
          />
          {error && (
            <p
              style={{ textAlign: "center", marginBottom: "0" }}
              className="search__undertext"
            >
              Неправильный логин или пароль
            </p>
          )}
        </div>
        <button
          onClick={(e) => handleClickLogin(e)}
          className="auhorization__completed-btn"
        >
          Войти
        </button>
        <a href="#1">
          <button type="button" className="forgotpass__btn">
            Восстановить пароль
          </button>
        </a>
        <div className="another__authorization">
          <p className="another__authorization-text">Войти через:</p>
          <div className="another__authorization-icons">
            <a href="#1">
              <img src="./img/Google.svg" alt="google-icon" />
            </a>
            <a href="#1">
              <img src="./img/Facebook.svg" alt="facebook-icon" />
            </a>
            <a href="#1">
              <img src="./img/Yandex.svg" alt="yandex-icon" />
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AuthorizationForm;
