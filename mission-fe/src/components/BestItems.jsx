import { useEffect, useState } from "react";
import "./BestItems.css";
import heartIcon from "../images/icons/ic_heart.png";

function BestItems() {
  const [productLists, setProductLists] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getPageSize = () => {
    if (windowWidth <= 768) {
      return 1; // 모바일: 1개
    } else if (windowWidth <= 1024) {
      return 2; // 태블릿: 2개
    } else {
      return 4; // 데스크탑: 4개
    }
  };

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300); // 300ms 딜레이
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

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

  const visibleProducts = productLists.slice(0, getPageSize());

  return (
    <section className="container">
      <h2>베스트 상품</h2>
      <div className="best-itemGrid">
        {visibleProducts.map((item) => (
          <div key={item.id}>
            <img src={item.images} alt={item.title} className="itemCard" />
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
