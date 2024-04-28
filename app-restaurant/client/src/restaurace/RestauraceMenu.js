import { useContext } from "react";
import { RestauraceContext } from "../contexts/RestauraceContext";

function RestauraceMenu() {
  const { produkty } = useContext(RestauraceContext);
  console.log(produkty);
  return (
    <div style={{ width: "100%" }}>
      {produkty &&
        produkty.map((restaurace) => {
          return (
            <div>
              <h2>{restaurace.nazev}</h2>
              <p>{restaurace.popis}</p>
              <p>{restaurace.cena}</p>
              <p>{restaurace.alergeny}</p>
              <p>{restaurace.vahagramy}</p>
            </div>
          );
        })}
    </div>
  );
}

export default RestauraceMenu;
