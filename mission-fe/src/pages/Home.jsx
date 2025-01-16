import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/home.css";
import feature1Image from "../assets/images/home/feature1-image.png";
import feature2Image from "../assets/images/home/feature2-image.png";
import feature3Image from "../assets/images/home/feature3-image.png";
import heroImage from "../assets/images/home/hero-image.png";
import bottomBannerImage from "../assets/images/home/bottom-banner-image.png";

function Home() {
  return (
    <>
      <Header />
      <main className="with-header">
        <section id="hero" className="banner">
          <div className="wrapper">
            <h1>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link to="/products" className="button pill-button">
              구경하러 가기
            </Link>
          </div>
        </section>

        <section id="features" className="wrapper">
          <div className="feature">
            <img src={feature1Image} alt="인기 상품" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Hot item</h2>
              <h1>
                인기 상품을
                <br />
                확인해 보세요
              </h1>
              <p className="feature-description">
                가장 HOT한 중고거래 물품을
                <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <h2 className="feature-tag">Search</h2>
              <h1>
                구매를 원하는
                <br />
                상품을 검색하세요
              </h1>
              <p className="feature-description">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img src={feature2Image} alt="검색 기능" width="50%" />
          </div>

          <div className="feature">
            <img src={feature3Image} alt="판매 상품 등록" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Register</h2>
              <h1>
                판매를 원하는
                <br />
                상품을 등록하세요
              </h1>
              <p className="feature-description">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section id="bottomBanner" className="banner">
          <div className="wrapper">
            <h1>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h1>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
