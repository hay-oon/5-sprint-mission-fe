import { Link } from "react-router-dom";
import "./NavMenu.css";

function NavMenu({ children, isActive, to }) {
  return (
    <Link to={to} className={`navMenu ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
}

export default NavMenu;
