import "./Footer.css";

import instagramLogo from "../../assets/images/social/instagram-logo.svg";
import facebookLogo from "../../assets/images/social/facebook-logo.svg";
import twitterLogo from "../../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../../assets/images/social/youtube-logo.svg";
import facebookUrl from "../../assets/images/social/facebook-logo.svg";
import twitterUrl from "../../assets/images/social/twitter-logo.svg";
import youtubeUrl from "../../assets/images/social/youtube-logo.svg";
import instagramUrl from "../../assets/images/social/instagram-logo.svg";

function Footer() {
  return (
    <footer>
      <div>©codeit - 2024</div>
      <div className="footerMenu">
        <a href="privacy.html">Privacy Policy</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div className="socialMedia">
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <img src={facebookLogo} alt="페이스북" width="20" />
        </a>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <img src={twitterLogo} alt="트위터" width="20" />
        </a>
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
          <img src={youtubeLogo} alt="유튜브" width="20" />
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="인스타그램" width="20" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
