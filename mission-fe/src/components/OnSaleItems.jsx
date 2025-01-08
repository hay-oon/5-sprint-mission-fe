import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "./OnSaleItems.css";
import heartIcon from "../images/icons/ic_heart.png";
import vectorIcon from "../images/icons/Vector.png";
import toggleIcon from "../images/icons/ic_arrow_down.png";

function OnSaleItems() {
  const [productList, setProductList] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const handleSortChange = (value) => {
    setOrderBy(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const fetchOnSaleItems = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products?page=${currentPage}&pageSize=${pageSize}&orderBy=${orderBy}`
        );
        if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다");

        const data = await response.json();
        setProductList(data.list);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } catch (err) {
        console.log("데이터 로딩 에러:", err);
      }
    };

    fetchOnSaleItems();
  }, [currentPage, orderBy]);

  return (
    <section className="container">
      <div className="sectionHeader">
        <h2>판매중인 상품</h2>
        <div className="searchBox">
          <div className="searchInput">
            <img src={vectorIcon} alt="검색" className="searchIcon" />
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
          </div>
          <button className="register-button">상품 등록하기</button>

          <div className="dropdown">
            <button
              className="dropdownButton"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {orderBy === "recent" ? "최신순" : "좋아요순"}
              <img src={toggleIcon} alt="토글" width={24} />
            </button>
            {isDropdownOpen && (
              <div className="dropdownMenu">
                <div>
                  <button onClick={() => handleSortChange("recent")}>
                    최신순
                  </button>
                </div>
                <div>
                  <button onClick={() => handleSortChange("favorite")}>
                    좋아요순
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="onSale-itemGrid">
        {productList.map((item) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default OnSaleItems;
