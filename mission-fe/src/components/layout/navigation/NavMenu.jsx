import "./NavMenu.css";

function NavMenu({ children, isActive }) {
  return (
    <button className={`navMenu ${isActive ? "active" : ""}`}>
      {children}
    </button>
  );
}

export default NavMenu;
