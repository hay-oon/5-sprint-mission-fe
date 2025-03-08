"use client";

import { useState } from "react";
import toggleIcon from "@public/icons/ic_arrow_down.png";
import Image from "next/image";
// Props의 타입 정의
interface ProductSortDropdownProps {
  orderBy: string;
  setOrderBy: (value: string) => void; // 함수이지만 return 값이 없으므로 void
}

const ProductSortDropdown: React.FC<ProductSortDropdownProps> = ({
  orderBy,
  setOrderBy,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // dropdown handler
  const handleSortChange = (value: string): void => {
    setOrderBy(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="dropdownButton"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {orderBy === "recent" ? "최신순" : "좋아요순"}
        <Image src={toggleIcon} alt="토글" width={24} />
      </button>
      {isDropdownOpen && (
        <div className="dropdownMenu">
          <div>
            <button onClick={() => handleSortChange("recent")}>최신순</button>
          </div>
          <div>
            <button onClick={() => handleSortChange("favorite")}>
              좋아요순
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSortDropdown;
