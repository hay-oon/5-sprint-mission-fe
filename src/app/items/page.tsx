import BestItems from "@/components/common/BestItems";
import OnSaleItems from "@/components/common/OnSaleItems";
import { getBestProducts, getProductsByPage } from "@/api/products";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function ItemsPage() {
  // 서버 사이드에서 QueryClient 인스턴스 생성
  const queryClient = new QueryClient();

  // 베스트 상품 데이터 prefetching (모바일, 태블릿, 데스크톱 크기별로)
  await Promise.all([
    // 모바일 크기 (1개)
    queryClient.prefetchQuery({
      queryKey: ["bestProducts", 1],
      queryFn: () => getBestProducts(1),
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    }),
    // 태블릿 크기 (2개)
    queryClient.prefetchQuery({
      queryKey: ["bestProducts", 2],
      queryFn: () => getBestProducts(2),
      staleTime: 1000 * 60 * 5,
    }),
    // 데스크톱 크기 (4개)
    queryClient.prefetchQuery({
      queryKey: ["bestProducts", 4],
      queryFn: () => getBestProducts(4),
      staleTime: 1000 * 60 * 5,
    }),
  ]);

  // 판매중인 상품 데이터 prefetching (모바일, 태블릿, 데스크톱 크기별로)
  await Promise.all([
    // 모바일 크기 (4개)
    queryClient.prefetchQuery({
      queryKey: ["products", 1, 4, "recent", ""],
      queryFn: () => getProductsByPage(1, 4, "recent", ""),
      staleTime: 1000 * 60 * 2,
    }),
    // 태블릿 크기 (6개)
    queryClient.prefetchQuery({
      queryKey: ["products", 1, 6, "recent", ""],
      queryFn: () => getProductsByPage(1, 6, "recent", ""),
      staleTime: 1000 * 60 * 2,
    }),
    // 데스크톱 크기 (10개)
    queryClient.prefetchQuery({
      queryKey: ["products", 1, 10, "recent", ""],
      queryFn: () => getProductsByPage(1, 10, "recent", ""),
      staleTime: 1000 * 60 * 2,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BestItems />
      <OnSaleItems />
    </HydrationBoundary>
  );
}
