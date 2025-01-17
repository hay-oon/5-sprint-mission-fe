import { Link } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import "./home.css";
import feature1Image from "../../assets/images/home/feature1-image.png";
import feature2Image from "../../assets/images/home/feature2-image.png";
import feature3Image from "../../assets/images/home/feature3-image.png";
import heroImage from "../../assets/images/home/hero-image.png";
import bottomBannerImage from "../../assets/images/home/bottom-banner-image.png";

function Home() {
  return (
    <>
      <Header />
      <section class="landing">
        <div class="content">
          <div class="intro">
            <h1>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link to="/items" class="button">
              구경하러가기
            </Link>
          </div>
          <img id="img-landing" src={heroImage} alt="heroImage" />
        </div>
      </section>

      <section class="info hot-item">
        <div class="card">
          <img src={feature1Image} alt="feature1Image" />
          <div class="card-content">
            <div class="badge">Hot item</div>
            <h1>
              인기 상품을
              <br />
              확인해 보세요
            </h1>
            <p>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section class="info search">
        <div class="card">
          <img src={feature2Image} alt="feature2Image" />
          <div class="card-content">
            <div class="badge">Search</div>
            <h1>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <p>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
      </section>

      <section class="info register">
        <div class="card">
          <img src={feature3Image} alt="feature3Image" />
          <div class="card-content">
            <div class="badge">Register</div>
            <h1>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <p>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section class="banner">
        <div class="content">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h1>
          <img
            id="img-banner"
            src={bottomBannerImage}
            alt="bottomBannerImage"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
