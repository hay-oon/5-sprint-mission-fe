"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api/axios";
import Button from "@/components/common/Button";

export default function WriteArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/api/articles", {
        title,
        content,
      });

      // 생성된 게시글의 ID를 사용하여 해당 게시글 상세 페이지로 이동
      const newArticleId = response.data.id;
      router.push(`/articles/${newArticleId}`);
    } catch (error) {
      console.error("Failed to create article:", error);
      alert("게시글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장하기"}
          </Button>
        </div>
      </form>
    </div>
  );
}
