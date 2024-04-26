import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiSilverwareForkKnife } from "@mdi/js";
function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" style={{ backgroundColor: "black", color: "white" }}>
      <Container
        style={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div onClick={() => navigate("/")}>
          <Icon path={mdiSilverwareForkKnife} size={2} />
        </div>
      </Container>
    </Navbar>
  );
}

function NavBarStyle() {
  return {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  };
}

export default NavBar;
