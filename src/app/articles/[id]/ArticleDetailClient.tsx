"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Article, deleteArticle } from "@/api/articles";
import { Comment, getCommentsByArticleId, createComment } from "@/api/comments";
import CommentItem from "@/components/common/CommentItem";
import CommentForm from "@/components/common/CommentForm";
import { formatDate } from "@/utils/date";
import ContextMenu from "@/components/common/ContextMenu";
import { useRouter } from "next/navigation";
import LikeCountBtn from "@/components/common/LikeCountBtn";
interface ArticleDetailClientProps {
  article: Article;
}

export default function ArticleDetailClient({
  article,
}: ArticleDetailClientProps) {
  const router = useRouter();

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // 댓글 데이터 불러오기
  const fetchComments = useCallback(async () => {
    try {
      setIsLoadingComments(true);
      const commentsData = await getCommentsByArticleId(article.id.toString());
      setComments(commentsData.comments);
    } catch (err) {
      console.error("댓글을 불러오는데 실패했습니다.", err);
    } finally {
      setIsLoadingComments(false);
    }
  }, [article.id]);

  // 컴포넌트 마운트 시 댓글 데이터 불러오기
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 댓글 작성 핸들러
  const handleSubmitComment = async (content: string) => {
    try {
      await createComment(article.id.toString(), content);
      fetchComments(); // 댓글 목록 새로고침
    } catch (err) {
      console.error("댓글 작성에 실패했습니다.", err);
    }
  };

  // 게시글 삭제 핸들러
  const handleDeleteArticle = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteArticle(article.id.toString());
        router.push("/articles");
      } catch (err) {
        console.error("게시글 삭제에 실패했습니다.", err);
      }
    }
  };

  // ContextMenu 핸들러
  const handleMenuSelect = (value: string) => {
    if (value === "edit") {
      router.push(`/articles/edit/${article.id}`);
    } else if (value === "delete") {
      handleDeleteArticle();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-[234px] md:mb-[561px] lg:mb-[463px] px-4 py-8">
      {/* 게시글 제목 */}
      <h2 className="text-xl font-bold mb-4">{article.title}</h2>

      {/* 게시글 정보 */}
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <Image src="/icons/Avatar.png" alt="profile" width={32} height={32} />
          <span className="ml-2 text-gray-600">총명한판다</span>
        </div>
        <span className="mx-2 text-gray-400">·</span>
        <span className="text-gray-400">{formatDate(article.createdAt)}</span>
        <div className="ml-8 pl-8 border-l border-gray-200">
          <LikeCountBtn
            favoriteCount={article.likeCount}
            onLikeClick={() => {}}
            isFavorite={false}
          />
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

      {/* 게시글 내용 */}
      <div className="bg-white py-6 px-0 border-t border-gray-200 mb-8">
        <p className="whitespace-pre-wrap">{article.content}</p>
      </div>

      {/* 댓글 섹션 */}
      <div>
        <h3 className="text-lg font-bold mb-4">댓글달기</h3>

        {/* 댓글 입력 폼 */}
        <CommentForm
          onSubmit={handleSubmitComment}
          placeholder="댓글을 입력해주세요."
        />

        {/* 댓글 목록 */}
        <div>
          {isLoadingComments ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                articleId={article.id.toString()}
                onCommentUpdated={fetchComments}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Image
                src="/images/img_no_comment.png"
                alt="댓글이 없습니다"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>

        {/* 목록으로 돌아가기 버튼 */}
        <div className="flex justify-center mt-8">
          <button
            className="px-10 py-2 bg-primary-blue text-white font-semibold rounded-3xl hover:bg-primary-dark"
            onClick={() => router.push("/articles")}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
