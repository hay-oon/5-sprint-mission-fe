import { useState, useEffect } from "react";
import Pagination from "../../common/Pagination";
import SearchInput from "../../common/SearchInput";
import DropDown from "../../common/DropDown";
import "./OnSaleItems.css";
import heartIcon from "../../../assets/icons/ic_heart.png";
import defaultImage from "../../../assets/icons/img_default.png";
import useResponsivePageSize from "../../../hooks/useResponsivePageSize";

const BASE_URL = "https://panda-market-api.vercel.app";

function OnSaleItems() {
  const [productList, setProductList] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = useResponsivePageSize({ mobile: 4, tablet: 6, desktop: 10 });

  // fetch data
  useEffect(() => {
    const fetchOnSaleItems = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/products?page=${currentPage}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
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
  }, [currentPage, orderBy, pageSize, keyword]);

  // render
  return (
    <section className="container">
      <div className="sectionHeader">
        <h2>판매중인 상품</h2>
        <div className="searchBox">
          <SearchInput keyword={keyword} setKeyword={setKeyword} />
          <button className="register-button">상품 등록하기</button>
          <DropDown orderBy={orderBy} setOrderBy={setOrderBy} />
        </div>
      </div>

      <div className="onSale-itemGrid">
        {productList.map((item) => (
          <div key={item.id}>
            <img
              src={item.images || defaultImage}
              alt={item.title}
              className="itemCard"
              onError={(e) => {
                e.target.onerror = null;
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default OnSaleItems;
