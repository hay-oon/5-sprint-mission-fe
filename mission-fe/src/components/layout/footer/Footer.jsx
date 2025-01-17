import "./Footer.css";

import instagramLogo from "../../../assets/images/social/instagram-logo.svg";
import facebookLogo from "../../../assets/images/social/facebook-logo.svg";
import twitterLogo from "../../../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../../../assets/images/social/youtube-logo.svg";

function Footer() {
  return (
    <footer>
      <div>©codeit - 2024</div>
      <div id="footerMenu">
        <a href="privacy.html">Privacy Policy</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div id="socialMedia">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebookLogo} alt="페이스북" width="20" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitterLogo} alt="트위터" width="20" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeLogo} alt="유튜브" width="20" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagramLogo} alt="인스타그램" width="20" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
