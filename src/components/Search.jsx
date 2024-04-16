import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkInn } from "../validation/checkInn";
import { checkLimit } from "../validation/checkLimit";
import {
  getHistograms,
  getObjectSearch,
  getObjectSearchId,
} from "../features/authorization/authorizationSlice";
import "../styles/search.css";

function Search() {
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inn, setInn] = useState("");

  const [isValid, setIsValid] = useState({
    dateValid: null,
    innValid: null,
    quantityValid: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.currentToken);

  const currentDate = new Date();
  const maxDate = currentDate.toISOString().split("T")[0];
  currentDate.setFullYear(currentDate.getFullYear() - 1);
  const minDate = currentDate.toISOString().split("T")[0];

  const handleClickSearchHistorygrams = (e) => {
    e.preventDefault();
    if (isValid.innValid && isValid.quantityValid && isValid.dateValid) {
      dispatch(getHistograms({ token, startDate, endDate, inn, quantity }));
      dispatch(getObjectSearch({ token, startDate, endDate, inn, quantity }))
        .then((result) => {
          if (
            result.meta.requestStatus === "fulfilled" &&
            result.payload.data &&
            result.payload.data.items
          ) {
            const encodedIds = result.payload.data.items
              .slice(0, 2)
              .map((el) => el.encodedId);
            return dispatch(getObjectSearchId({ token, ids: encodedIds }));
          } else {
            console.error(
              "Failed to fetch object search data or no data returned"
            );
          }
        })
        .then(() => {
          navigate("/results_page");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };

  const handleChangeInn = (e) => {
    const { value } = e.target;
    setInn(value);
    setIsValid((prevState) => ({
      ...prevState,
      innValid: checkInn(value),
    }));
  };

  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    setQuantity(value);
    setIsValid((prevState) => ({
      ...prevState,
      quantityValid: checkLimit(value),
    }));
  };

  const checkDate = () => {
    if (!startDate || !endDate) {
      return true;
    } else {
      return new Date(startDate) <= new Date(endDate);
    }
  };

  const handleChangeStartDate = (e) => {
    const { value } = e.target;
    setStartDate(value);
    setIsValid((prevState) => ({
      ...prevState,
      dateValid: checkDate(),
    }));
  };

  const handleChangeEndDate = (e) => {
    const { value } = e.target;
    setEndDate(value);
    setIsValid((prevState) => ({
      ...prevState,
      dateValid: checkDate(),
    }));
  };

  return (
    <div className="search__main">
      <div className="search__main-heading">
        <h1 className="heading__search">
          Найдите необходимые <br /> данные в пару кликов.
        </h1>
        <p className="subheading__serch">
          Задайте параметры поиска. <br /> Чем больше заполните, тем точнее
          поиск
        </p>
        <img
          className="heading__image-1"
          src="./img/Document.svg"
          alt="doc-icon"
        />
        <img
          className="heading__image-2"
          src="./img/Folders.svg"
          alt="folders-icon"
        />
      </div>
      <div className="search__section-wrapper">
        <div className="search__section">
          <div className="search__section-1">
            <div className="search__company">
              <p className="title__company">
                ИНН компании
                {!(isValid.innValid === null || isValid.innValid) && (
                  <span className="title__company-star">*</span>
                )}
              </p>
              <input
                onChange={(e) => handleChangeInn(e)}
                className={
                  isValid.innValid === null || isValid.innValid
                    ? "company__input-general"
                    : "company__input-general-valid"
                }
                placeholder="10 цифр"
                type="text"
                value={inn}
              />
              {!(isValid.innValid === null || isValid.innValid) && (
                <p className="search__undertext">Введите корректные данные</p>
              )}
            </div>

            <div className="search__key">
              <p className="title__key">Тональность</p>
              <select className="enter__key">
                <option className="key">Позитивная</option>
                <option className="key">Негативная</option>
                <option className="key">Любая</option>
              </select>
            </div>
            <div className="search__quantity">
              <p className="title__quantity">
                Количество документов в выдаче
                {!(isValid.quantityValid === null || isValid.quantityValid) && (
                  <span className="title__company-star">*</span>
                )}
              </p>
              <input
                onChange={(e) => handleChangeQuantity(e)}
                className={
                  isValid.quantityValid === null || isValid.quantityValid
                    ? "company__input-general"
                    : "company__input-general-valid"
                }
                placeholder="От 1 до 1000"
                type="text"
                value={quantity}
              />
            </div>
            {!(isValid.quantityValid === null || isValid.quantityValid) && (
              <p className="search__undertext">Обязательное поле</p>
            )}
            <div className="search__date">
              <p className="titles">
                Диапазон поиска
                {!(isValid.dateValid === null || isValid.dateValid) && (
                  <span className="title__company-star">*</span>
                )}
              </p>
              <form>
                <div className="search__date-calendar">
                  <div className="input__calendar-1">
                    <input
                      value={startDate}
                      min={minDate}
                      max={maxDate}
                      onChange={(e) => handleChangeStartDate(e)}
                      className={
                        !(isValid.dateValid === null || isValid.dateValid)
                          ? "search__date-input-istvalid"
                          : "search__date-input"
                      }
                      type="date"
                    />
                    <span className="open-button">
                      <button className="calendar-img" type="button">
                        <img src="./img/Arrow.svg" alt="arrow_icon" />
                      </button>
                    </span>
                  </div>
                  <div className="input__calendar-2">
                    <input
                      value={endDate}
                      min={minDate}
                      max={maxDate}
                      onChange={(e) => handleChangeEndDate(e)}
                      className={
                        !(isValid.dateValid === null || isValid.dateValid)
                          ? "search__date-input-istvalid"
                          : "search__date-input"
                      }
                      type="date"
                    />
                    <span className="open-button">
                      <button className="calendar-img" type="button">
                        <img src="./img/Arrow.svg" alt="arrow_icon" />
                      </button>
                    </span>
                  </div>
                </div>
                {!(isValid.dateValid === null || isValid.dateValid) && (
                  <p
                    style={{ textAlign: "center" }}
                    className="search__undertext"
                  >
                    Введите корректные данные
                  </p>
                )}
              </form>
            </div>
          </div>
          <div className="seach__section-2">
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Признак максимальной полноты
              </label>
            </div>
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Упоминания в бизнес-контексте
              </label>
            </div>
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Главная роль в публикации
              </label>
            </div>
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Публикации только с риск-факторами
              </label>
            </div>
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Включать технические новости рынков
              </label>
            </div>
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Включать анонсы и календари
              </label>
            </div>
            <div className="checkboxes__group">
              <label>
                <input
                  className="real__checkbox"
                  type="checkbox"
                  name="coding-notes"
                />
                <span className="custom__chekbox"></span>
                Включать сводки новостей
              </label>
            </div>
            <button
              onClick={(e) => handleClickSearchHistorygrams(e)}
              className="search__btn"
              type="button"
            >
              Поиск
            </button>
            <p className="underbtn__text">* Обязательные к заполнению поля</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
