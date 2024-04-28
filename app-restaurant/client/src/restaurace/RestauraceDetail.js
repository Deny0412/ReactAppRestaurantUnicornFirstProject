import { useContext } from "react";
import { RestauraceContext } from "../contexts/RestauraceContext";
function RestauraceDetail() {
  const { restaurace } = useContext(RestauraceContext);
  return (
    <div>
      {restaurace && (
        <div className="restaurace-detail" style={{ textAlign: "center" }}>
          <h1>{restaurace.nazev}</h1>
          <p>{restaurace.popis}</p>
          <div>{restaurace.adresa}</div>
          <div>{restaurace.otviraciHodiny}</div>
          <div>
            <a href={`mailto:${restaurace.email}`}>{restaurace.email}</a>
            <a href={`tel:${restaurace.telefon}`}>{restaurace.telefon}</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestauraceDetail;
