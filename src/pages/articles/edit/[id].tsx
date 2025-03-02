import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/common/Button";
import { getArticleById, updateArticle } from "@/api/articles";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 기존 게시글 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const articleData = await getArticleById(id as string);
        setTitle(articleData.title);
        setContent(articleData.content);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
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
