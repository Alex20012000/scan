import "../styles/main.css";
import { tariffsData } from "../data/tariffsData";
import Card from "./Card";

function Tariffs() {
  return (
    <div className="section_3">
      <h5 className="section__3-heading">explore our plans</h5>
      <div className="tariff__cards">
        {tariffsData.map((tariff, index) => (
          <Card
            key={index}
            tariff={tariff.currentTariff}
            color={tariff.color}
            title={tariff.title}
            subtitle={tariff.subtitle}
            icon={tariff.icon}
            price={tariff.price}
            withoutSell={tariff.withoutSell}
            credit={tariff.credit}
            includes={tariff.tariffIncludes}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Tariffs;
