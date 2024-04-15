import { useEffect } from "react";
import { useSelector } from "react-redux";

function Card({
  color,
  tariff,
  subtitle,
  title,
  icon,
  price,
  credit,
  withoutSell,
  index,
  includes,
}) {
  const authorizationActiveTariff = useSelector(
    (state) => state.user.authorization
  );
  const current = tariff && authorizationActiveTariff;

  useEffect(() => {}, [authorizationActiveTariff]);

  return (
    <div
      style={{
        border: current ? `2px solid ${color}` : "none",
        boxShadow: "5px 5px 10px rgba(128, 128, 128, 1)",
      }}
      className="card"
    >
      <div
        style={{
          backgroundColor: `${color}`,
          borderRadius: "10px",
          color: index === 2 ? "#fff" : "#000000",
        }}
        className="card__header"
      >
        <h2 className="heading__card">{title}</h2>
        <p className="text__card">{subtitle}</p>
        <img className="card__icon" src={icon} alt="icons_card" />
      </div>
      <div className="card__main-content">
        {current && <p className="current__tariff">Текущий тариф</p>}
        <div className="price__container">
          <h5 className="price">{price}</h5>
          <s>
            <p className="price__withsale">{withoutSell}</p>
          </s>
        </div>
        <p className="text__card">{credit}</p>
        <div>
          <h5 className="about__tariff">В тариф входит:</h5>
          <ul>
            {includes.map((bonus, index) => (
              <li key={index} className="about__tariff-topic">
                {bonus}
              </li>
            ))}
          </ul>
        </div>

        <button className={current ? "card__button-active" : "card__button"}>
          {current ? "Перейти в личный кабинет" : "Подробнее"}
        </button>
      </div>
    </div>
  );
}

export default Card;
