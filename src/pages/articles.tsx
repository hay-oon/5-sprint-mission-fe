import BestArticleCard from "@/components/common/BestArticleCard";
import ArticleCard from "@/components/common/ArticleCard";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import { useState, useEffect } from "react";
import Dropdown from "@/components/common/Dropdown";
import { api } from "@/api/axios";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
}

interface ArticleResponse {
  articles: Article[];
  totalPages: number;
}

interface ArticlesPageProps {
  initialArticles: Article[];
}
// 초기 로딩 시 SSR 사용
export async function getServerSideProps() {
  try {
    const response = await api.get<ArticleResponse>(`/api/articles`, {
      params: {
        page: 1,
        sortBy: "latest",
      },
    });

    return {
      props: {
        initialArticles: response.data.articles,
      },
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return {
      props: {
        initialArticles: [],
      },
    };
  }
}

// 검색, 정렬 변경 시 클라이언트 컴포넌트 재렌더링
export default function ArticlesPage({ initialArticles }: ArticlesPageProps) {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "likes">("latest");
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 불러오기
  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<ArticleResponse>(`/api/articles`, {
        params: {
          page: 1,
          sortBy,
          keyword,
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로딩 및 검색, 정렬 변경 시 새로 불러오기
  useEffect(() => {
    if (initialArticles.length === 0) {
      fetchArticles();
    } // 초기 로딩 시 데이터가 없으면 데이터를 불러오고, 있으면 데이터를 불러오지 않음
  }, [sortBy, keyword]);

  const handleSort = (value: "latest" | "likes") => {
    setSortBy(value);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <section className="mt-4 mb-6 px-4">
        <h2 className="text-[18px] text-text-primary-black font-bold">
          베스트 게시글
        </h2>
        <div className="flex justify-center">
          <BestArticleCard
            content="맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야 하나요?"
            nickname="총명한판다"
            createdAt="2025-02-24"
            likeCount={10}
          />
        </div>
      </section>

      <section className="px-4">
        <div className="flex justify-between">
          <h2 className="flex items-center text-[18px] text-text-primary-black font-bold">
            게시글
          </h2>
          <div>
            <Button>글쓰기</Button>
          </div>
        </div>
        <div className="flex justify-between gap-[13px] mt-4 md:mt-12 xl:mt-6">
          <SearchInput
            placeholder="검색할 상품을 입력해주세요"
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <Dropdown onSortChange={handleSort} />
        </div>
        <div className="flex flex-col gap-4 mt-4 md:mt-12 xl:mt-6">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : (
            <>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    content={article.content}
                    nickname="총명한판다"
                    createdAt={article.createdAt}
                    likeCount={article.likeCount}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  게시글이 없습니다.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
