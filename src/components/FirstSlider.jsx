import Slider from "react-slick";
import { data } from "../data/sliderFirstData";
import { NextArrow, PrevArrow } from "./arrow";
import "../styles/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FirstSlider() {
  const settings = {
    arrows: true,
    autoplay: true,
    centerMode: true,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <div className="firstslider__block">
      <h5 className="heading__2">Почему именно мы</h5>
      <div className="firstslider">
        <Slider {...settings}>
          {data.map((el, index) => (
            <div key={index} className="firstslider__card">
              <img src={el.img} alt="Slider_Icon" />
              <p className="firstslider__card-text">{el.text}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default FirstSlider;
