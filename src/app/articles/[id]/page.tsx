import { getArticleById } from "@/api/articles";
import ArticleDetailClient from "./ArticleDetailClient";
import { notFound } from "next/navigation";

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 게시글은 SSR로 렌더링 (댓글은 CSR)
export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = await params;

  try {
    const article = await getArticleById(id);

    if (!article) {
      notFound();
    }

    return <ArticleDetailClient article={article} />;
  } catch (error) {
    console.error("게시글을 불러오는데 실패했습니다:", error);
    notFound();
  }
}
