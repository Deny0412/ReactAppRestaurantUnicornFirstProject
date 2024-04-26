import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div
        className="MainContent"
        style={{
          height: "calc(100vh - 106px)",
          overflow: "hidden",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
