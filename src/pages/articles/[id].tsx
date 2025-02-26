import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Article, getArticleById, deleteArticle } from "@/api/articles";
import { Comment, getCommentsByArticleId, createComment } from "@/api/comments";
import CommentItem from "@/components/common/CommentItem";
import CommentForm from "@/components/common/CommentForm";
import { formatDate } from "@/utils/date";
import ContextMenu from "@/components/common/ContextMenu";

function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 게시글 상세 정보 조회
  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const articleData = await getArticleById(id as string);
        setArticle(articleData);
        setError("");
      } catch (err) {
        console.error("게시글을 불러오는데 실패했습니다.", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // 댓글 목록 조회
  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByArticleId(id as string);
        setComments(commentsData.comments);
      } catch (err) {
        console.error("댓글을 불러오는데 실패했습니다.", err);
      }
    };

    fetchComments();
  }, [id]);

  // 댓글 작성 핸들러
  const handleSubmitComment = async (content: string) => {
    if (!id) return;

    await createComment(id as string, content);

    // 댓글 작성 후 댓글 목록 다시 불러오기
    const commentsData = await getCommentsByArticleId(id as string);
    setComments(commentsData.comments);
  };

  // 게시글 수정 및 삭제 핸들러
  const handleMenuSelect = async (value: string) => {
    if (!id) return;

    if (value === "edit") {
      // 수정 페이지로 이동
      router.push(`/articles/edit/${id}`);
    } else if (value === "delete") {
      if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
        try {
          await deleteArticle(id as string);
          alert("게시글이 삭제되었습니다.");
          router.push("/articles");
        } catch (err) {
          console.error("게시글 삭제에 실패했습니다.", err);
          alert("게시글 삭제에 실패했습니다.");
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        로딩중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

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
          <div className="flex items-center border border-gray-200 rounded-3xl px-3 py-1">
            <button className="flex items-center text-gray-500">
              <Image
                src="/icons/ic_heart.png"
                alt="like"
                width={24}
                height={24}
              />
              <span className="ml-1">{article.likeCount}</span>
            </button>
          </div>
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
        <CommentForm onSubmit={handleSubmitComment} />

        {/* 댓글 목록 */}
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                articleId={id as string}
                onCommentUpdated={() => {
                  // 댓글 수정/삭제 후 댓글 목록 다시 불러오기
                  getCommentsByArticleId(id as string).then((data) => {
                    setComments(data.comments);
                  });
                }}
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

export default ArticleDetailPage;
