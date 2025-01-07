import { useEffect, useState } from "react";
import "./BestItems.css";
import heartIcon from "../images/icons/ic_heart.png";

function BestItems() {
  const [bestItems, setBestItems] = useState([]);

  useEffect(() => {
    const fetchBestItems = async () => {
      try {
        const response = await fetch(
          "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }
        const data = await response.json();
        console.log("데이터 응답값", data);
        setBestItems(data.list);
      } catch (err) {
        console.log("데이터 로딩 에러:", err);
      }
    };

    fetchBestItems();
  }, []);

  return (
    <section className="container">
      <h2>베스트 상품</h2>
      <div className="best-itemGrid">
        {bestItems.map((item) => (
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
