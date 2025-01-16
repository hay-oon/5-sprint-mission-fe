// import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo/logo.svg";
// import mobileLogo from "../../assets/images/logo/headerlogo_mobile.png";

// function Header() {
//   return (
//     <header className="header">
//       <Link to="/">
//         <img src={logo} alt="판다마켓 홈" width="153" />
//         <img src={mobileLogo} alt="판다마켓 홈" className="mobile-logo" />
//       </Link>
//       <Link to="/login" id="loginLinkButton" className="button">
//         로그인
//       </Link>
//     </header>
//   );
// }

// export default Header;
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/logo/logo.svg";
import avatar from "../../assets/icons/Avatar.png";
import NavMenu from "../common/NavMenu";
import mobileLogo from "../../assets/images/logo/headerlogo_mobile.png";

function Header() {
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
          <NavMenu>중고거래</NavMenu>
        </div>
      </div>
      <div className="header-right">
        <Link to="/login" className="login-button">
          로그인
        </Link>
        <button className="avatar-button">
          <img src={avatar} alt="프로필" />
        </button>
      </div>
    </div>
  );
}

export default Header;
