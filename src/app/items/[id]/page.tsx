"use client";

import CommentForm from "@/components/common/CommentForm";
import CommentItem from "@/components/common/CommentItem";
import ContextMenu from "@/components/common/ContextMenu";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import defaultImage from "@public/icons/img_default.png";
import { formatDate } from "@/utils/date";
import LikeCountBtn from "@/components/common/LikeCountBtn";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getProductById,
  getProductComments,
  createProductComment,
  deleteProduct,
  addFavorite,
  removeFavorite,
  CommentsResponse,
} from "@/api/products";
import { getImageUrl } from "@/utils/images/url";

export default function ItemDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const alertShown = useRef(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 인증 상태 확인 - useEffect 내에서 localStorage 접근
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !alertShown.current) {
      alertShown.current = true;
      alert("로그인이 필요한 서비스입니다.");
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // 상품 상세 정보 조회
  const {
    data: item,
    isLoading: isItemLoading,
    isError: isItemError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId && isAuthenticated === true,
    staleTime: 1000 * 60 * 5,
  });

  // 댓글 목록 조회 (무한 스크롤)
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useInfiniteQuery({
    queryKey: ["productComments", productId],
    queryFn: ({ pageParam }) => getProductComments(productId, pageParam),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage: CommentsResponse) => lastPage.nextCursor,
    enabled: !!productId && isAuthenticated === true,
    staleTime: 1000 * 60 * 2,
  });

  // 댓글 작성 뮤테이션
  const commentMutation = useMutation({
    mutationFn: (content: string) => createProductComment(productId, content),
    onSuccess: () => {
      alert("댓글이 등록되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록에 실패했습니다.");
    },
  });

  // 상품 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      alert("상품이 성공적으로 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/items");
    },
    onError: (error) => {
      console.error("상품 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다.");
    },
  });

  // 좋아요 뮤테이션
  const likeMutation = useMutation({
    mutationFn: () => {
      return item?.isFavorite
        ? removeFavorite(productId)
        : addFavorite(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError: (error) => {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리에 실패했습니다.");
    },
    // optimistic update
    onMutate: () => {
      queryClient.setQueryData(["product", productId], (oldData: any) => {
        return {
          ...oldData,
          isFavorite: !item?.isFavorite,
        };
      });
    },
  });

  // 댓글 목록 가져오기
  const comments = commentsData?.pages.flatMap((page) => page.list) || [];

  // 인증 확인 중이거나 로딩 중 표시
  if (isAuthenticated === null || isItemLoading) {
    return <LoadingSpinner size={12} />;
  }

  // 에러 표시
  if (isItemError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl mb-4">
          상품 정보를 불러오는데 실패했습니다.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-3xl"
          onClick={() => router.push("/items")}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }
  console.log(item);

  return (
    <div className="max-w-[1200px] mx-auto mb-[234px] md:mb-[561px] lg:mb-[463px] px-4 py-8">
      <div className="flex flex-col md:flex-row md:gap-6 mb-6 border-b border-gray-300 pb-6">
        <div>
          <Image
            src={getImageUrl(item?.images?.[0], defaultImage.src)}
            alt={item?.name || "상품 이미지"}
            width={480}
            height={480}
            className="aspect-square border border-gray-300 rounded-2xl mb-4 object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = defaultImage.src;
            }}
            unoptimized
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
            <div className="flex flex-col gap-2 ">
              <h1 className="text-[16px] md:text-[20px] lg:text-[24px] text-text-primary-black font-semibold">
                {item?.name}
              </h1>
              <p className="text-[24px] md:text-[32px] lg:text-[40px] text-text-primary-black font-semibold">
                {item?.price?.toLocaleString()}원
              </p>
            </div>
            <div className="ml-auto">
              <ContextMenu
                options={[
                  { value: "edit", label: "수정하기" },
                  { value: "delete", label: "삭제하기" },
                ]}
                onSelect={(value) => {
                  if (value === "edit") {
                    router.push(`/items/${productId}/edit`);
                  } else if (value === "delete") {
                    setIsDeleteModalOpen(true);
                  }
                }}
                trigger={
                  <Image
                    src="/icons/ic_kebab.png"
                    alt="edit-delete"
                    width={24}
                    height={24}
                  />
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-[14px] text-text-primary-black font-semibold">
              상품 소개
            </h2>
            <p className="text-[14px] text-text-primary-black">
              {item?.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-[14px] text-text-primary-black font-semibold">
              상품 태그
            </h2>
            <div className="flex gap-2">
              {item?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[16px] text-text-primary-black bg-tag-background rounded-full px-4 py-[6px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={"/icons/Avatar.png"}
                alt="기본 프로필 이미지"
                width={40}
                height={40}
              />

              <div>
                <p className="text-[14px] text-text-primary-black">
                  {item?.ownerNickname}
                </p>
                <p className="text-[14px] text-text-primary-gray">
                  {formatDate(item?.createdAt || "")}
                </p>
              </div>
            </div>
            <LikeCountBtn
              favoriteCount={item?.favoriteCount || 0}
              onLikeClick={() => likeMutation.mutate()}
              isFavorite={item?.isFavorite || false}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">문의하기</h3>
        <CommentForm
          onSubmit={(content) => commentMutation.mutate(content)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />

        {isCommentsLoading ? (
          <LoadingSpinner size={8} />
        ) : isCommentsError ? (
          <div className="flex justify-center py-8 text-red-500">
            댓글을 불러오는데 실패했습니다.
          </div>
        ) : comments.length > 0 ? (
          <div>
            {comments.map((comment, index) => (
              <CommentItem
                key={`${comment.id}-${index}`}
                comment={comment}
                articleId={productId}
                onCommentUpdated={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["productComments", productId],
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Image
              src="/images/img_no_inquiry.png"
              alt="문의가 없습니다"
              width={196}
              height={230}
            />
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 rounded-3xl text-gray-700 border border-gray-300 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "로딩 중..." : "더 보기"}
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="px-10 py-2 bg-primary-blue text-white font-semibold rounded-3xl hover:bg-primary-dark"
          onClick={() => router.push("/items")}
        >
          목록으로 돌아가기
        </button>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message="정말로 상품을 삭제하시겠어요?"
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
}
