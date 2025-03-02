import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Article, getArticleById, deleteArticle } from "@/api/articles";
import { Comment, getCommentsByArticleId, createComment } from "@/api/comments";
import CommentItem from "@/components/common/CommentItem";
import CommentForm from "@/components/common/CommentForm";
import { formatDate } from "@/utils/date";
import ContextMenu from "@/components/common/ContextMenu";
import { GetStaticProps, GetStaticPaths } from "next";
import { api } from "@/api/axios";

interface ArticleDetailPageProps {
  article: Article;
}

function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const router = useRouter();
  const { id } = router.query;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // 댓글 데이터 불러오기
  const fetchComments = async () => {
    if (!id) return;

    try {
      setIsLoadingComments(true);
      const commentsData = await getCommentsByArticleId(id as string);
      setComments(commentsData.comments);
    } catch (err) {
      console.error("댓글을 불러오는데 실패했습니다.", err);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // 컴포넌트 마운트 시 댓글 데이터 불러오기
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  // 댓글 작성 핸들러
  const handleSubmitComment = async (content: string) => {
    if (!id) return;

    try {
      await createComment(id as string, content);
      fetchComments(); // 댓글 작성 후 목록 다시 불러오기
    } catch (err) {
      console.error("댓글 작성에 실패했습니다.", err);
    }
  };

  // 게시글 수정 및 삭제 핸들러
  const handleMenuSelect = async (value: string) => {
    if (!id) return;

    if (value === "edit") {
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

  // 페이지가 생성 중일 때
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
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
          {isLoadingComments ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                articleId={id as string}
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

// 빌드 시점에 생성할 경로 지정
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 인기 게시글 목록을 가져와서 미리 생성할 경로로 지정
    const response = await api.get(`/api/articles`, {
      params: {
        page: 1,
        sortBy: "likes",
        limit: 10, // 인기 게시글 상위 10개만 미리 생성
      },
    });

    const articles = response.data.articles;
    const paths = articles.map((article: any) => ({
      params: { id: article.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking", // 페이지가 완전히 생성된 후 보여주도록 함
    };
  } catch (error) {
    console.error("정적 경로 생성 중 오류 발생:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// 빌드 시점에 페이지 데이터 가져오기
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const article = await getArticleById(id);

    // 게시글이 없는 경우 404 페이지 반환
    if (!article) {
      return { notFound: true };
    }

    return {
      props: { article },
      revalidate: 3600, // 1시간마다 재검증
    };
  } catch (error) {
    console.error("정적 페이지 생성 중 오류 발생:", error);
    return {
      notFound: true,
      revalidate: 60, // 오류 발생 시 1분 후 재시도
    };
  }
};

export default ArticleDetailPage;
