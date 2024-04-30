import { useContext } from "react";
import { RestauraceContext } from "../contexts/RestauraceContext";

function RestauraceMenu() {
  const { produkty } = useContext(RestauraceContext);
  console.log(produkty);
  return (
    <div className="restaurace-menu">
      {produkty &&
        produkty.map((produkt) => {
          return (
            <div className="restaurace-item" key={produkt.id}>
              <h2 className="restaurace-name">{produkt.nazev}</h2>
              <p className="restaurace-description">{produkt.popis}</p>
              <p className="restaurace-price">{produkt.cena} Kč</p>
              <p className="restaurace-allergens">{produkt.alergeny}</p>
              <p className="restaurace-weight">{produkt.vahagramy}g</p>
            </div>
          );
        })}
    </div>
  );
}

export default RestauraceMenu;
