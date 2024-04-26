import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function RestauraceCard({ restaurace }) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{restaurace.nazev}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button
          type="primary"
          onClick={() => navigate("/restauraceDetail?id=" + restaurace.id)}
          size={"sm"}
        ></Button>
      </Card.Body>
    </Card>
  );
}

export default RestauraceCard;
