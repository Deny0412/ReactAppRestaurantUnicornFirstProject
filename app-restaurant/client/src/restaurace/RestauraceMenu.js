import { useContext } from "react";
import { RestauraceContext } from "../contexts/RestauraceContext";

function RestauraceMenu() {
  const { produkty } = useContext(RestauraceContext);
  console.log(produkty);
  return (
    <div className="restaurace-menu">
      {produkty &&
        produkty.map((restaurace) => {
          return (
            <div className="restaurace-item" key={restaurace.id}>
              <h2 className="restaurace-name">{restaurace.nazev}</h2>
              <p className="restaurace-description">{restaurace.popis}</p>
              <p className="restaurace-price">{restaurace.cena} Kč</p>
              <p className="restaurace-allergens">{restaurace.alergeny}</p>
              <p className="restaurace-weight">{restaurace.vahagramy}g</p>
            </div>
          );
        })}
    </div>
  );
}

export default RestauraceMenu;
