import "./Header.css";
import logo from "../../assets/images/logo/logo.svg";
import avatar from "../../assets/icons/Avatar.png";
import NavMenu from "../common/NavMenu";
import mobileLogo from "../../assets/images/logo/headerlogo_mobile.png";

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <a href="/">
          <img
            src={logo}
            alt="판다마켓 홈"
            width="153"
            className="desktop-logo"
          />
          <img src={mobileLogo} alt="판다마켓 홈" className="mobile-logo" />
        </a>
        <div className="nav-menu-container">
          <NavMenu>자유게시판</NavMenu>
          <NavMenu>중고거래</NavMenu>
        </div>
      </div>
      <div className="header-right">
        <a href="login.html" className="login-button">
          로그인
        </a>
        <button className="avatar-button">
          <img src={avatar} alt="프로필" />
        </button>
      </div>
    </div>
  );
}

export default Header;
