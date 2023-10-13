import { NavLink } from "react-router-dom";

const Nav = () => {
  const activeStyles = {
    color: "white",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  };
  return (
    <>
      <div className="w-full max-w-screen-lg flex justify-evenly list-none">
        <div className="justify-start">
          <li>
            <NavLink to="/" className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span className="ml-1">VidChat</span>
            </NavLink>
          </li>
        </div>
        <div className="flex justify-end">
          <li className="mr-2 text-blue-400 hover:text-blue-800">
            <NavLink
              to="/"
              style={({ isActive }) => {
                return isActive ? activeStyles : {};
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="text-blue-400 hover:text-blue-800">
            {" "}
            <NavLink
              to="/about"
              style={({ isActive }) => {
                return isActive ? activeStyles : {};
              }}
            >
              About
            </NavLink>
          </li>
        </div>
      </div>
    </>
  );
};

export default Nav;
