import { useEffect, useState } from "react";
import "../styles/results.css";
import { useDispatch, useSelector } from "react-redux";
import { getObjectSearchId } from "../features/authorization/authorizationSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SearchResult() {
  const [end, setEnd] = useState(5);
  const [start, setStart] = useState(3);
  const [xmlSecond, setXmlSecond] = useState("");
  const [xml, setXml] = useState("");

  const dispatch = useDispatch();
  const publications = useSelector((state) => state.user.publicationIds);
  const histograms = useSelector((state) => state.user.histograms);
  const publication = useSelector((state) => state.user.publication);
  const token = useSelector((state) => state.user.currentToken);

  const handleClickShowMore = (e) => {
    const encodedIds = publication.slice(start, end).map((el) => el.encodedId);
    dispatch(getObjectSearchId({ token, ids: encodedIds }));
    setStart(start + 2);
    setEnd(end + 2);
  };

  useEffect(() => {
    if (publications.length > 0 && publications[0].ok.content.markup) {
      const xmlString = publications[0].ok.content.markup;
      const xmlStringSecond = publications[1].ok.content.markup;

      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(xmlString, "application/xml");
      const xmlDocSecond = parser.parseFromString(
        xmlStringSecond,
        "application/xml"
      );

      const getTextContent = (doc) => {
        let str = "";
        for (let key in doc.getElementsByTagName("sentence")) {
          str += doc.getElementsByTagName("sentence")[key]["textContent"];
        }
        return str.replace(/<[^>]*>/g, "").slice(0, 1200) + "...";
      };

      setXml(getTextContent(xmlDoc));
      setXmlSecond(getTextContent(xmlDocSecond));
    }
  }, [histograms, publications, publication]);

  return (
    <div className="searchresult__wrapper">
      <div className="searchresult__section-1">
        <h1 className="searchresult__section-1-heading">
          Ищем. Скоро <br /> будут результаты
        </h1>
        <p className="searchresult__section-1-text">
          Поиск может занять некоторое время, <br /> просим сохранять терпение.
        </p>
        <img
          className="searchresult__section-1-img"
          src="./img/SearchResultImg.png"
          alt=""
        />
      </div>
      <div className="general__summary">
        <h5 className="general__summary-title">общая сводка</h5>
        <p className="general__summary-subtitle">Найдено 4 221 вариантов</p>
        <div className="general__summary-main">
          <div className="general__summary-main-titles">
            <p>Период</p>
            <p>Всего</p>
            <p>Риски</p>
          </div>
          <div className="search__summary-slider">
            {histograms?.data[0]?.data?.map((el, index) => (
              <div key={index} className="date__and-general">
                <p className="date__historgams">
                  {el?.date.slice(0, 10).split("-").reverse().join(".")}
                </p>
                <p className="general__histograms">{el?.value}</p>
                <p className="risk__histograms">
                  {histograms?.data[1]?.data[index].value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="general__summary-publication">
        <h5 className="publication__heading-title">Список документов</h5>
        <div className="general__summary-allpublication">
          {publications?.map((card, index) => (
            <div key={index} className="publication__block">
              <div className="publication__block-titleAndDate">
                <p className="publication__date">
                  {card?.ok?.issueDate
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                </p>
                <span className="publication__author">
                  {card.ok?.source.name}
                </span>
              </div>
              <h5 className="publication__heading">{card.ok?.title.text}</h5>
              <p className="publication__subtitle">Технические новости</p>
              <img src="/img/PublicationImg_1.png" alt="publication-img" />
              <p className="publication__text-first">
                {index === 0 ? xml : xmlSecond}
              </p>
              <button className="publication__button">
                Читать в источнике
              </button>
              <span className="publication__wordCount">
                {card.ok?.attributes.wordCount} слова
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={(e) => handleClickShowMore(e)}
          className="general__sumaary-btn"
        >
          Показать больше
        </button>
      </div>
    </div>
  );
}

export default SearchResult;
