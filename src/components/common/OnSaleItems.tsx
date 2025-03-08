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
  _id: string;
  name: string;
  price: number;
  images?: string;
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
      // 데이터 유효성 검사 추가
      if (data && Array.isArray(data.list)) {
        // API 응답 형식에 맞게 수정 (data.list와 data.totalCount 사용)
        setProductList(
          data.list.map((item: any) => ({
            _id: item.id.toString(), // id를 _id로 변환
            name: item.name,
            price: item.price,
            images: item.thumbnail, // thumbnail을 images로 사용
            favoriteCount: item.likes || 0, // likes를 favoriteCount로 사용
          }))
        );

        // totalCount와 pageSize를 기반으로 totalPages 계산
        const calculatedTotalPages = Math.ceil(
          (data.totalCount || 0) / pageSize
        );
        setTotalPages(calculatedTotalPages || 1);
      } else {
        console.error("API 응답 형식이 올바르지 않습니다:", data);
        setProductList([]);
        setTotalPages(1);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, orderBy, pageSize, keyword]);

  // render
  return (
    <section className="max-w-[120rem] px-8 py-16 mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">판매중인 상품</h2>
        <div className="flex gap-4">
          <SearchInput keyword={keyword} setKeyword={setKeyword} />
          <Button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg text-lg cursor-pointer"
            onClick={() => router.push("/registration")}
          >
            상품 등록하기
          </Button>
          <ProductSortDropdown orderBy={orderBy} setOrderBy={setOrderBy} />
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
              key={item._id || `product-${index}`}
              className="cursor-pointer"
              onClick={() => router.push(`/products/${item._id}`)}
            >
              <Image
                src={item.images || defaultImage}
                alt={item.name}
                width={500}
                height={500}
                className="w-full aspect-square border border-gray-300 rounded-2xl overflow-hidden mb-3 object-cover cursor-pointer transition-transform duration-300 ease-in-out shadow-md hover:-translate-y-2 hover:shadow-lg"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = defaultImage.src;
                }}
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
