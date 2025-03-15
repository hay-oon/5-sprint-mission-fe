"use client";

import { useState, useMemo, useCallback } from "react";
import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";
import ProductSortDropdown from "@/components/common/ProductSortDropdown";
import heartIcon from "@public/icons/ic_heart.png";
import defaultImage from "@public/icons/img_default.png";
import useResponsivePageSize from "@/hooks/useResponsivePageSize";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsByPage, getProductById } from "@/api/products";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const OnSaleItems: React.FC = () => {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = useResponsivePageSize({ mobile: 4, tablet: 6, desktop: 10 });
  const router = useRouter();
  const queryClient = useQueryClient();

  // 쿼리 키를 메모이제이션하여 불필요한 리렌더링 방지
  const queryKey = useMemo(
    () => ["products", currentPage, pageSize, orderBy, keyword],
    [currentPage, pageSize, orderBy, keyword]
  );

  // 쿼리 함수를 메모이제이션
  const queryFn = useCallback(
    () => getProductsByPage(currentPage, pageSize, orderBy, keyword),
    [currentPage, pageSize, orderBy, keyword]
  );

  // useQuery
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 2, // 2분 동안 캐시 유지
  });

  // 상품 목록 및 총 페이지 수 계산을 메모이제이션
  const { productList, totalPages } = useMemo(() => {
    const list = data?.list || [];
    const total = data?.totalCount ? Math.ceil(data.totalCount / pageSize) : 1;
    return { productList: list, totalPages: total };
  }, [data, pageSize]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  // 정렬 변경 핸들러
  const handleOrderByChange = useCallback(
    (value: string) => {
      setOrderBy(value);
      setCurrentPage(1);
    },
    [orderBy]
  );

  // 검색어 변경 핸들러
  const handleKeywordChange = useCallback(
    (value: string) => {
      setKeyword(value);
      setCurrentPage(1);
    },
    [keyword]
  );

  // 상품 상세 페이지로 이동하기 전에 데이터 Prefetching
  const handleProductClick = useCallback(
    (productId: string) => {
      // 상품 상세 데이터 Prefetching
      queryClient.prefetchQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
      });

      // 상품 상세 페이지로 이동
      router.push(`/items/${productId}`);
    },
    [queryClient, router]
  );

  // 상품 등록 페이지로 이동
  const handleRegistration = useCallback(() => {
    router.push("/registration");
  }, [router]);

  return (
    <section className="max-w-[1200px] px-6 py-10 mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold ㅡ">판매중인 상품</h2>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-stretch">
          <div className="w-full sm:w-64">
            <SearchInput
              keyword={keyword}
              setKeyword={handleKeywordChange}
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <Button
            className="h-10 px-4 bg-blue-500 text-white font-semibold rounded-lg text-sm whitespace-nowrap"
            onClick={handleRegistration}
          >
            상품 등록하기
          </Button>
          <div className="h-10">
            <ProductSortDropdown
              orderBy={orderBy}
              setOrderBy={handleOrderByChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <LoadingSpinner size={10} />
          </div>
        ) : isError ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <div className="flex flex-col items-center">
              <p className="text-lg text-red-500 mb-2">
                {(error as Error)?.message || "상품을 불러오는데 실패했습니다."}
              </p>
              <Button onClick={() => refetch()}>다시 시도</Button>
            </div>
          </div>
        ) : productList.length > 0 ? (
          productList.map((item, index) => (
            <div
              key={item.id || `product-${index}`}
              className="cursor-pointer"
              onClick={() => handleProductClick(item.id)}
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
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default OnSaleItems;
