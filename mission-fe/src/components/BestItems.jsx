import { useEffect, useState } from "react";
import "./BestItems.css";
import heartIcon from "../images/icons/ic_heart.png";
import defaultImage from "../images/icons/img_default.png";

function BestItems() {
  const [productLists, setProductLists] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // responsive handler
  useEffect(() => {
    let timeoutId; // setTimeout 의 반환값을 지정하고, clearTimeout 에 사용하기 위한 변수선언

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300); // 디바운싱, 불 필요한 리렌더링 방지
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const getPageSize = () => {
    if (windowWidth <= 768) {
      return 1; // mobile
    } else if (windowWidth <= 1024) {
      return 2; // tablet
    } else {
      return 4; // desktop
    }
  };

  // fetch data
  useEffect(() => {
    const fetchBestItems = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite`
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }
        const data = await response.json();
        setProductLists(data.list);
      } catch (err) {
        console.log("데이터 로딩 에러:", err);
      }
    };

    fetchBestItems();
  }, []);

  const visibleProducts = productLists.slice(0, getPageSize()); // best items slice

  return (
    <section className="container">
      <h2>베스트 상품</h2>
      <div className="best-itemGrid">
        {visibleProducts.map((item) => (
          <div key={item.id}>
            <img
              src={item.images || defaultImage}
              alt={item.title}
              className="itemCard"
              onError={(e) => {
                e.target.onerror = null; // default image 로딩 실패 시 오류 제거, 무한루프방지
                e.target.src = defaultImage;
              }}
            />
            <div className="itemInfo">
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString()}원</p>
              <span>
                <img src={heartIcon} alt="좋아요" className="heartIcon" />
                {item.favoriteCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestItems;
