import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./components/Main";

const Layout = () => {
  return (
    <div className="min-h-screen p-14 flex flex-col gap-2 items-center justify-center bg-gray-900">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
