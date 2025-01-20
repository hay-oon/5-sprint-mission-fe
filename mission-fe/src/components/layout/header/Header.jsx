import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/images/logo/logo.svg";
import avatar from "../../../assets/icons/Avatar.png";
import NavMenu from "../../layout/navigation/NavMenu";
import mobileLogo from "../../../assets/images/logo/headerlogo_mobile.png";
import Button from "../../common/Button";

function Header() {
  const location = useLocation(); // 현재 경로 가져오기
  const isItemsPage = location.pathname === "/items";

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img
            src={logo}
            alt="판다마켓 홈"
            width="153"
            className="desktop-logo"
          />
          <img src={mobileLogo} alt="판다마켓 홈" className="mobile-logo" />
        </Link>
        <div className="nav-menu-container">
          <NavMenu>자유게시판</NavMenu>
          <NavMenu isActive={isItemsPage} to="/items">
            중고마켓
          </NavMenu>
        </div>
      </div>
      <div className="header-right">
        <Button className="button">로그인</Button>
        <button className="avatar-button">
          <img src={avatar} alt="프로필" />
        </button>
      </div>
    </div>
  );
}

export default Header;
