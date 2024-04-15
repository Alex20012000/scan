import "../styles/main.css";

const PrevArrow = ({ onClick }) => (
  <img
    src="./img/SliderArrowLeft.svg"
    alt="Arrow Left"
    onClick={onClick}
    className="arrow-left"
  />
);

const NextArrow = ({ onClick }) => (
  <img
    src="./img/SliderArrowRight.svg"
    alt="Arrow Right"
    onClick={onClick}
    className="arrow-right"
  />
);

export { PrevArrow, NextArrow };
