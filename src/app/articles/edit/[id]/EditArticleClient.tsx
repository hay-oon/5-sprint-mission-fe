"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { updateArticle } from "@/api/articles";

interface EditArticleClientProps {
  article: {
    id: string;
    title: string;
    content: string;
    favoriteCount: number;
    createdAt: string;
  };
}

export default function EditArticleClient({ article }: EditArticleClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await updateArticle(article.id, {
        title,
        content,
      });

      // 수정 완료 후 상세 페이지로 이동
      router.push(`/articles/${article.id}`);
    } catch (error) {
      console.error("Failed to update article:", error);
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
