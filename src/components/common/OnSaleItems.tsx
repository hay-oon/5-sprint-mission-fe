"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";
import ProductSortDropdown from "@/components/common/ProductSortDropdown";
import heartIcon from "@public/icons/ic_heart.png";
import defaultImage from "@public/icons/img_default.png";
import useResponsivePageSize from "@/hooks/useResponsivePageSize";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Image from "next/image";

const BASE_URL = "https://panda-market-api.vercel.app/products";

// Product 인터페이스 정의
interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  favoriteCount?: number;
}

const OnSaleItems: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = useResponsivePageSize({ mobile: 4, tablet: 6, desktop: 10 });
  const router = useRouter();

  // fetch data
  const fetchOnSaleItems = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?page=${currentPage}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
      );
      if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다");

      const data = await response.json();
      setProductList(data.list);

      // totalCount와 pageSize를 기반으로 totalPages 계산
      const calculatedTotalPages = Math.ceil((data.totalCount || 0) / pageSize);
      setTotalPages(calculatedTotalPages || 1);
    } catch (err) {
      console.error("데이터 로딩 에러:", err);
      setProductList([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect 내에서만 fetchOnSaleItems 호출
  useEffect(() => {
    fetchOnSaleItems();
  }, [currentPage, orderBy, pageSize, keyword]);

  return (
    <section className="max-w-[1200px] px-6 py-10 mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold ㅡ">판매중인 상품</h2>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-stretch">
          <div className="w-full sm:w-64">
            <SearchInput
              keyword={keyword}
              setKeyword={setKeyword}
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <Button
            className="h-10 px-4 bg-blue-500 text-white font-semibold rounded-lg text-sm whitespace-nowrap"
            onClick={() => router.push("/registration")}
          >
            상품 등록하기
          </Button>
          <div className="h-10">
            <ProductSortDropdown orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
        {isLoading ? (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500">로딩 중...</p>
          </div>
        ) : productList && productList.length > 0 ? (
          productList.map((item, index) => (
            <div
              key={item.id || `product-${index}`}
              className="cursor-pointer"
              onClick={() => router.push(`/items/${item.id}`)}
            >
              <Image
                src={item.images?.[0] || defaultImage.src}
                alt={item.name}
                width={500}
                height={500}
                className="w-full aspect-square border border-gray-300 rounded-2xl overflow-hidden mb-1 object-cover cursor-pointer transition-transform duration-300 ease-in-out shadow-md hover:-translate-y-2 hover:shadow-lg"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = defaultImage.src;
                }}
                unoptimized // 이미지 최적화 비활성화
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
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  {item.favoriteCount || 0}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500">상품이 없습니다.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default OnSaleItems;
