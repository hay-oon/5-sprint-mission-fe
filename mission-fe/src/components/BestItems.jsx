import { useEffect, useState } from "react";
import "./BestItems.css";
import heartIcon from "../images/icons/ic_heart.png";
import defaultImage from "../images/icons/img_default.png";
import useResponsivePageSize from "../hooks/useResponsivePageSize.js";

function BestItems() {
  const [productLists, setProductLists] = useState([]);
  const pageSize = useResponsivePageSize({ mobile: 1, tablet: 2, desktop: 4 });

  // fetch data
  useEffect(() => {
    const fetchBestItems = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`
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
  }, [pageSize]);

  // const visibleProducts = productLists.slice(0, pageSize);

  return (
    <section className="container">
      <h2>베스트 상품</h2>
      <div className="best-itemGrid">
        {productLists.map((item) => (
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
