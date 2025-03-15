import {
  getProductById,
  getProductComments,
  CommentsResponse,
} from "@/api/products";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ItemDetailClient from "./ItemDetailClient";
import { notFound } from "next/navigation";

interface ItemDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  // params를 await 처리
  const resolvedParams = await Promise.resolve(params);
  const productId = resolvedParams.id;

  // 서버 사이드에서 QueryClient 인스턴스 생성
  const queryClient = new QueryClient();

  try {
    // 상품 상세 정보 prefetching
    await queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => getProductById(productId),
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    });

    // 상품 댓글 첫 페이지 prefetching
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["productComments", productId],
      queryFn: ({ pageParam }) => getProductComments(productId, pageParam),
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage: CommentsResponse) => lastPage.nextCursor,
      staleTime: 1000 * 60 * 2, // 2분 동안 캐시 유지
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ItemDetailClient productId={productId} />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound();
  }
}
