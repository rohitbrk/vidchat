import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center text-neutral-500 lg:text-left">
      <div className="p-6 text-center">
        <span>© 2023 Copyright:</span>
        <Link
          className="font-semibold text-neutral-600 dark:text-neutral-400"
          to="/"
        >
          {" "}
          VidChat
        </Link>
      </div>
    </div>
  );
};

export default Footer;
