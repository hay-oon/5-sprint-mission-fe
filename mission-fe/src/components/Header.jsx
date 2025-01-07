import "./Header.css";
import logo from "../images/logo/logo.svg";
import NavMenu from "./NavMenu";

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <a href="/">
          <img src={logo} alt="판다마켓 홈" width="153" />
        </a>
        <div className="nav-menu-container">
          <NavMenu>자유게시판</NavMenu>
          <NavMenu>중고거래</NavMenu>
        </div>
      </div>
      <div className="header-right">
        <a href="login.html" className="button">
          로그인
        </a>
      </div>
    </div>
  );
}

export default Header;
