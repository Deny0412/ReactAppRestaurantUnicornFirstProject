import { useNavigate } from "react-router-dom";

function RestauraceCard({ restaurace }) {
  const navigate = useNavigate();
  return (
    <div
      className="card-style"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      onDoubleClick={() => navigate("/restauraceDetail?id=" + restaurace.id)}
    >
      <h3 className="nadpis-restaurace center">{restaurace.nazev}</h3>
      <p className="p-5 vertical-center" style={{ flexGrow: "2" }}>
        {restaurace.popis}
      </p>
      <div className="card-bottom p-5">
        <a href={`mailto:${restaurace.email}`}>{restaurace.email}</a>
        <a href={`tel:${restaurace.telefon}`}>{restaurace.telefon}</a>
      </div>
    </div>
  );
}

export default RestauraceCard;
