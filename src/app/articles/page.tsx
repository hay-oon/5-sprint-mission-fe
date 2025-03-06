import { api } from "@/api/axios";
import ArticlesClient from "./ArticlesClient";

interface Article {
  id: number;
  title: string;
  createdAt: string;
  likeCount: number;
  nickname: string;
}

interface ArticleResponse {
  articles: Article[];
  totalPages: number;
}

interface SearchParams {
  keyword?: string;
  sortBy?: "latest" | "likes";
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const keyword = params.keyword || "";
  const sortBy = params.sortBy || "latest";

  try {
    // 일반 게시글과 베스트 게시글을 병렬로 요청
    const [articlesResponse, bestArticlesResponse] = await Promise.all([
      api.get<ArticleResponse>(`/api/articles`, {
        params: {
          page: 1,
          sortBy,
          keyword,
        },
      }),
      api.get<ArticleResponse>(`/api/articles`, {
        params: {
          page: 1,
          sortBy: "likes",
          limit: 3,
        },
      }),
    ]);

    // ArticlesClient에 전달할 초기 데이터 props
    return (
      <ArticlesClient
        initialArticles={articlesResponse.data.articles}
        bestArticles={bestArticlesResponse.data.articles}
        initialKeyword={keyword}
        initialSortBy={sortBy}
      />
    );
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return (
      <ArticlesClient
        initialArticles={[]}
        bestArticles={[]}
        initialKeyword={keyword}
        initialSortBy={sortBy}
      />
    );
  }
}
