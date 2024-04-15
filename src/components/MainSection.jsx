import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../fonts/font.otf";
import "../styles/main.css";
import FirstSlider from "./FirstSlider";
import Tariffs from "./Tariffs";

const MainSection = () => {
  const isAuth = useSelector((state) => state.user.authorization);
  const navigate = useNavigate();

  const handleClickGetData = (e) => {
    e.preventDefault();
    navigate("/search_page");
  };

  return (
    <div className="main__wrapper">
      <div className="section_1">
        <h1 className="section__1-heading">
          сервис по поиску <br /> публикаций <br /> о компании <br /> по его ИНН
        </h1>
        <p className="heading__text">
          Комплексный анализ публикаций, получение данных <br /> в формате PDF
          на электронную почту.
        </p>

        {isAuth && (
          <button
            onClick={(e) => handleClickGetData(e)}
            className="heading__btn"
            type="button"
          >
            Запросить данные
          </button>
        )}
      </div>
      <div className="section_2">
        <FirstSlider />
      </div>
      <div className="Section__2-img">
        <img src="./img/Section2Image.png" alt="section2_image_man" />
      </div>
      <Tariffs />
    </div>
  );
};

export default MainSection;
