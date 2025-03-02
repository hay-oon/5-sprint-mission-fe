import { useState } from "react";
import { useRouter } from "next/router";
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
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">게시글 작성</h1>
          </div>
          <div>
            <Button type="submit" disabled={isSubmitting}>
              등록
            </Button>
          </div>
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
