"use client";

import heartIcon from "@public/icons/ic_heart.png";
import defaultImage from "@public/icons/img_default.png";
import Image from "next/image";
import useResponsivePageSize from "@/hooks/useResponsivePageSize";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBestProducts,
  getProductById,
  Product,
  ProductsResponse,
} from "@/api/products";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getImageUrl } from "@/utils/images/url";

const BestItems: React.FC = () => {
  const pageSize = useResponsivePageSize({ mobile: 1, tablet: 2, desktop: 4 });
  const router = useRouter();
  const queryClient = useQueryClient();

  // React Query를 사용하여 베스트 상품 목록 조회
  const { data, isLoading, isError, error } = useQuery<ProductsResponse>({
    queryKey: ["bestProducts", pageSize],
    queryFn: () => getBestProducts(pageSize),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 데이터 갱신
  });

  const productLists = data?.list || [];

  // 상품 상세 페이지 데이터 Prefetching
  const handleProductClick = (productId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => getProductById(productId),
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    });

    // 상품 상세 페이지로 이동
    router.push(`/items/${productId}`);
  };

  return (
    <section className="max-w-[1200px] px-6 py-10 mx-auto w-full">
      <h2 className="text-xl font-bold mb-4">베스트 상품</h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner size={10} />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-red-500">
            {(error as Error)?.message || "상품을 불러오는데 실패했습니다."}
          </p>
        </div>
      ) : productLists.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500">베스트 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {productLists.map((item: Product) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item.id)}
              className="cursor-pointer"
            >
              <Image
                src={getImageUrl(item.images?.[0], defaultImage.src)}
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
                    width={16}
                    height={16}
                  />
                  {item.favoriteCount || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BestItems;
