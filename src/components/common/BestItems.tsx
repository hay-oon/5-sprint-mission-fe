"use client";

import { useEffect, useState } from "react";
import heartIcon from "@public/icons/ic_heart.png";
import defaultImage from "@public/icons/img_default.png";
import Image from "next/image";
import useResponsivePageSize from "@/hooks/useResponsivePageSize";

const BASE_URL = "https://panda-market-api.vercel.app";

interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  favoriteCount?: number;
}

const BestItems: React.FC = () => {
  const [productLists, setProductLists] = useState<Product[]>([]);
  const pageSize = useResponsivePageSize({ mobile: 1, tablet: 2, desktop: 4 });

  useEffect(() => {
    const fetchBestItems = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${BASE_URL}/products?page=1&pageSize=${pageSize}&orderBy=favorite`
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

  return (
    <section className="max-w-[1200px] px-6 py-10 mx-auto w-full">
      <h2 className="text-xl font-bold mb-4">베스트 상품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {productLists.map((item) => (
          <div key={item.id}>
            <Image
              src={item.images?.[0] || defaultImage.src}
              alt={item.name || "상품 이미지"}
              width={500}
              height={500}
              className="w-full aspect-square border border-gray-300 rounded-2xl overflow-hidden mb-1 object-cover cursor-pointer transition-transform duration-300 ease-in-out shadow-md hover:-translate-y-2 hover:shadow-lg"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = defaultImage.src;
              }}
              unoptimized
            />
            <div className="p-3">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-xl font-bold mb-2">
                {item.price.toLocaleString()}원
              </p>
              <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Image
                  src={heartIcon}
                  alt="좋아요"
                  className="w-4 h-4"
                  width={16} // 너비 추가
                  height={16} // 높이 추가
                />
                {item.favoriteCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestItems;
