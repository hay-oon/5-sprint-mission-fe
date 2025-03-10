"use client";

import CommentForm from "@/components/common/CommentForm";
import CommentItem from "@/components/common/CommentItem";
import ContextMenu from "@/components/common/ContextMenu";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/api/axios";
import defaultImage from "@public/icons/img_default.png";
import { formatDate } from "@/utils/date";
import LikeCountBtn from "@/components/common/LikeCountBtn";
import { Comment } from "@/api/comments";

interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  description: string;
  tags?: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}
export default function ItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Product>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  const getItemDetail = async () => {
    const response = await api.get(`/products/${id}`);
    const data = await response.data;
    setItem(data);
  };

  const getComments = async (cursor?: number | null) => {
    const params = new URLSearchParams();
    params.append("limit", "5");
    if (cursor) {
      params.append("cursor", cursor.toString());
    }

    const response = await api.get(
      `/products/${id}/comments?${params.toString()}`
    );
    const data = await response.data;

    if (cursor) {
      // 더보기: 기존 댓글에 새 댓글 추가
      setComments((prev) => [...prev, ...data.list]);
    } else {
      // 초기 로딩: 댓글 목록 설정
      setComments(data.list);
    }

    setNextCursor(data.nextCursor);
  };

  const handleCommentSubmit = async (content: string) => {
    try {
      await api.post(`/products/${id}/comments`, { content });
      alert("댓글이 등록되었습니다.");
      getComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  // 상품 수정 함수
  const handleEditProduct = () => {
    router.push(`/items/${id}/edit`);
  };

  // 상품 삭제 함수
  const handleDeleteProduct = async () => {
    if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
      try {
        await api.delete(`/products/${id}`);
        alert("상품이 성공적으로 삭제되었습니다.");
        router.push("/items");
      } catch (error) {
        console.error("상품 삭제 실패:", error);
        alert("상품 삭제에 실패했습니다.");
      }
    }
  };

  // ContextMenu 선택 처리 함수
  const handleMenuSelect = (value: string) => {
    if (value === "edit") {
      handleEditProduct();
    } else if (value === "delete") {
      handleDeleteProduct();
    }
  };

  useEffect(() => {
    getItemDetail();
    getComments();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto mb-[234px] md:mb-[561px] lg:mb-[463px] px-4 py-8">
      <div className="flex flex-col md:flex-row md:gap-6 mb-6 border-b border-gray-300 pb-6">
        <div>
          <Image
            src={item?.images?.[0] || defaultImage.src}
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
                {item?.price.toLocaleString()}원
              </p>
            </div>
            <div className="ml-auto">
              <ContextMenu
                options={[
                  { value: "edit", label: "수정하기" },
                  { value: "delete", label: "삭제하기" },
                ]}
                onSelect={handleMenuSelect}
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
            <LikeCountBtn favoriteCount={item?.favoriteCount || 0} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">문의하기</h3>
        <CommentForm
          onSubmit={handleCommentSubmit}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />

        {comments.length > 0 ? (
          <div>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                articleId={id as string}
                onCommentUpdated={getComments}
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

        {nextCursor && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 rounded-3xl text-gray-700 border border-gray-300 hover:bg-gray-300 "
              onClick={() => {
                getComments(nextCursor);
              }}
            >
              더 보기
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
    </div>
  );
}
