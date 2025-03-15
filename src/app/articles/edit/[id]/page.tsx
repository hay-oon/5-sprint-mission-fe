import { getArticleById } from "@/api/articles";
import EditArticleClient from "./EditArticleClient";
import NotFound from "@/app/not-found";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  try {
    const article = await getArticleById(id);

    if (!article) {
      return <NotFound />;
    }

    return <EditArticleClient article={article} />;
  } catch (error) {
    console.error("게시글을 불러오는데 실패했습니다:", error);
    return <NotFound />;
  }
}
