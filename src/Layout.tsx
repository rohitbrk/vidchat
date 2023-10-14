import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen p-14 flex flex-col gap-2 items-center justify-center">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
