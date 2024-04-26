import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiSilverwareForkKnife } from "@mdi/js";
function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" style={{ backgroundColor: "grey", color: "white" }}>
      <Container className="center">
        <div onClick={() => navigate("/")}>
          <Icon color={"black"} path={mdiSilverwareForkKnife} size={2} />
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
