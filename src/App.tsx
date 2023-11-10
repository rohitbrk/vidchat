import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./components/Main";
import UserInfoProvider from "./context/UserInfoContext";

const Layout = () => {
  return (
    <div className="min-h-screen p-14 flex flex-col gap-2 items-center justify-center bg-stone-900">
      <Nav />
      <UserInfoProvider>
        <Main />
      </UserInfoProvider>
      <Footer />
    </div>
  );
};

export default Layout;
