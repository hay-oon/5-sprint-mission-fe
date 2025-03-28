"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Article,
  getArticleById,
  deleteArticle,
  addArticleFavorite,
  removeArticleFavorite,
} from "@/api/articles";
import { Comment, getCommentsByArticleId, createComment } from "@/api/comments";
import CommentItem from "@/components/common/CommentItem";
import CommentForm from "@/components/common/CommentForm";
import { formatDate } from "@/utils/date";
import ContextMenu from "@/components/common/ContextMenu";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";
import LikeCountBtn from "@/components/common/LikeCountBtn";

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const alertShown = useRef(false);
  const articleId = useRef<string | null>(null);

  // 인증 상태 확인 - useEffect 내에서 localStorage 접근
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !alertShown.current) {
      alertShown.current = true;
      alert("로그인이 필요한 서비스입니다.");
      router.push("/auth/login");
    }
  }, [router]);

  // 게시글 데이터 불러오기
  const fetchArticle = useCallback(async () => {
    try {
      setIsLoading(true);
      const articleData = await getArticleById(id);
      setArticle(articleData);
      setIsFavorite(articleData.isFavorite || false);
      setFavoriteCount(articleData.favoriteCount);
      articleId.current = articleData.id.toString();

      // 게시글 로드 성공 후 바로 댓글 로드
      try {
        setIsLoadingComments(true);
        const commentsData = await getCommentsByArticleId(
          articleData.id.toString()
        );
        console.log("댓글 데이터:", commentsData);
        if (commentsData && commentsData.comments) {
          setComments(commentsData.comments);
          console.log("설정된 댓글 데이터:", commentsData.comments);
        } else {
          console.error("댓글 데이터 형식이 올바르지 않습니다:", commentsData);
          setComments([]);
        }
      } catch (err) {
        console.error("댓글을 불러오는데 실패했습니다.", err);
        setComments([]);
      } finally {
        setIsLoadingComments(false);
      }

      console.log(articleData);
    } catch (error) {
      console.error("게시글을 불러오는데 실패했습니다:", error);
      router.push("/404");
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  // 댓글 데이터 불러오기
  const fetchComments = useCallback(async () => {
    if (!articleId.current) return;

    try {
      setIsLoadingComments(true);
      const commentsData = await getCommentsByArticleId(articleId.current);
      console.log(commentsData);
      setComments(commentsData.comments);
    } catch (err) {
      console.error("댓글을 불러오는데 실패했습니다.", err);
    } finally {
      setIsLoadingComments(false);
    }
  }, []);

  // 컴포넌트 마운트 시 게시글 데이터 불러오기
  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  // 댓글 작성 핸들러
  const handleSubmitComment = async (content: string) => {
    if (!articleId.current) return;

    try {
      await createComment(articleId.current, content);
      alert("댓글이 등록되었습니다.");

      // 댓글 목록 새로고침
      try {
        setIsLoadingComments(true);
        const commentsData = await getCommentsByArticleId(articleId.current);
        console.log("댓글 작성 후 새로 불러온 데이터:", commentsData);
        if (commentsData && commentsData.comments) {
          setComments(commentsData.comments);
        }
      } catch (err) {
        console.error("댓글 작성 후 목록 불러오기 실패:", err);
      } finally {
        setIsLoadingComments(false);
      }
    } catch (err) {
      console.error("댓글 작성에 실패했습니다.", err);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  // 게시글 삭제 핸들러
  const handleDeleteArticle = async () => {
    if (!article) return;

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
    if (!article) return;

    if (value === "edit") {
      router.push(`/articles/edit/${article.id}`);
    } else if (value === "delete") {
      handleDeleteArticle();
    }
  };

  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    if (!article) return;

    try {
      if (isFavorite) {
        await removeArticleFavorite(article.id.toString());
        setFavoriteCount((prev) => Math.max(0, prev - 1));
      } else {
        await addArticleFavorite(article.id.toString());
        setFavoriteCount((prev) => prev + 1);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("좋아요 처리에 실패했습니다:", err);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto mb-[234px] md:mb-[561px] lg:mb-[463px] px-4 py-8">
      {/* 게시글 제목 */}
      <h2 className="text-xl font-bold mb-4">{article.title}</h2>

      {/* 게시글 정보 */}
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <Image src="/icons/Avatar.png" alt="profile" width={32} height={32} />
          <span className="ml-2 text-gray-600">{article.writer.nickname}</span>
        </div>
        <span className="mx-2 text-gray-400">·</span>
        <span className="text-gray-400">{formatDate(article.createdAt)}</span>
        <div className="ml-8 pl-8 border-l border-gray-200">
          <LikeCountBtn
            favoriteCount={favoriteCount}
            onLikeClick={handleLikeToggle}
            isFavorite={isFavorite}
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
          ) : comments && comments.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                총 {comments.length}개의 댓글
              </p>
              {comments.map((comment, index) => (
                <CommentItem
                  key={`${comment.id || index}-${index}`}
                  comment={comment}
                  articleId={article.id.toString()}
                  onCommentUpdated={fetchComments}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Image
                src="/images/img_no_comment.png"
                alt="댓글이 없습니다"
                width={200}
                height={200}
              />
              <p className="mt-4 text-gray-500">
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
              </p>
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
