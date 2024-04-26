import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={{ height: "calc(100vh - 106px)", overflow: "hidden" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
