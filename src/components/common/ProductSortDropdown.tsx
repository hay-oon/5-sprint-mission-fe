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
    <div className="relative h-full">
      <button
        className="flex items-center justify-between px-4 py-2 h-full w-32 bg-white border border-gray-300 rounded-lg text-gray-700 text-md font-medium"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{orderBy === "recent" ? "최신순" : "좋아요순"}</span>
        <Image src={toggleIcon} alt="토글" width={16} height={16} />
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-10">
          <div className="hover:bg-gray-100">
            <button
              className="w-full text-center px-4 py-2 text-md"
              onClick={() => handleSortChange("recent")}
            >
              최신순
            </button>
          </div>
          <div className="hover:bg-gray-100">
            <button
              className="w-full text-center px-4 py-2 text-md"
              onClick={() => handleSortChange("favorite")}
            >
              좋아요순
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSortDropdown;
