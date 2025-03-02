import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/common/Button";
import { getArticleById, updateArticle } from "@/api/articles";
import { GetServerSideProps } from "next";

interface EditArticlePageProps {
  article: {
    id: string;
    title: string;
    content: string;
    likeCount: number;
    createdAt: string;
  };
}

export default function EditArticlePage({ article }: EditArticlePageProps) {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!id) return;

    try {
      setIsSubmitting(true);
      await updateArticle(id as string, {
        title,
        content,
      });

      alert("게시글이 수정되었습니다.");
      router.push(`/articles/${id}`);
    } catch (error) {
      console.error("게시글 수정에 실패했습니다:", error);
      alert("게시글 수정에 실패했습니다.");
      setError("게시글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">게시글 수정</h1>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            수정
          </Button>
        </div>

        <div>
          <label htmlFor="title" className="block mb-2 font-bold">
            *제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full py-4 px-6 bg-input-background border-none rounded-xl"
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-2 font-bold">
            *내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full py-4 px-6 bg-input-background border-none rounded-xl min-h-[200px]"
            placeholder="내용을 입력해주세요"
          />
        </div>
      </form>
    </div>
  );
}

// 서버 사이드 렌더링으로 변경
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params || {};

    if (!id) {
      return {
        notFound: true,
      };
    }

    const article = await getArticleById(id as string);

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error("게시글을 불러오는데 실패했습니다:", error);
    return {
      notFound: true,
    };
  }
};
