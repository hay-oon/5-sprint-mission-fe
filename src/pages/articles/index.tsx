import BestArticleCard from "@/components/common/BestArticleCard";
import ArticleCard from "@/components/common/ArticleCard";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import { useState, useEffect, useCallback } from "react";
import Dropdown from "@/components/common/Dropdown";
import { api } from "@/api/axios";
import Link from "next/link";
import router from "next/router";
import { GetServerSideProps } from "next";

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

interface ArticlesPageProps {
  initialArticles: Article[];
  bestArticles: Article[];
  initialKeyword?: string;
  initialSortBy?: "latest" | "likes";
}

// 서버 사이드 렌더링으로 변경
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { keyword = "", sortBy = "latest" } = context.query;

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

    return {
      props: {
        initialArticles: articlesResponse.data.articles,
        bestArticles: bestArticlesResponse.data.articles,
        initialKeyword: keyword || "",
        initialSortBy: sortBy || "latest",
      },
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return {
      props: {
        initialArticles: [],
        bestArticles: [],
        initialKeyword: "",
        initialSortBy: "latest",
      },
    };
  }
};

// 검색, 정렬 변경 시 클라이언트 컴포넌트 재렌더링
export default function ArticlesPage({
  initialArticles,
  bestArticles: initialBestArticles,
  initialKeyword = "",
  initialSortBy = "latest",
}: ArticlesPageProps) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [sortBy, setSortBy] = useState<"latest" | "likes">(initialSortBy);
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [bestArticles] = useState<Article[]>(initialBestArticles || []);
  const [isLoading, setIsLoading] = useState(false);

  // 화면 크기에 따른 베스트 게시글 개수 조절을 위한 훅
  const [displayCount, setDisplayCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDisplayCount(3);
      } else if (window.innerWidth >= 768) {
        setDisplayCount(2);
      } else {
        setDisplayCount(1);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 게시글 불러오기
  const fetchArticles = useCallback(async () => {
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
  }, [sortBy, keyword]);

  // 검색, 정렬 변경 시 새로 불러오기 및 URL 업데이트
  useEffect(() => {
    fetchArticles();

    // URL 쿼리 파라미터 업데이트
    const query: { keyword?: string; sortBy: string } = { sortBy };
    if (keyword) query.keyword = keyword;

    router.push(
      {
        pathname: "/articles",
        query,
      },
      undefined,
      { shallow: true }
    );
  }, [sortBy, keyword, fetchArticles]);

  const handleSort = (value: "latest" | "likes") => {
    setSortBy(value);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <section className="mt-4 mb-6 px-4">
        <h2 className="text-[18px] text-text-primary-black font-bold">
          베스트 게시글
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {bestArticles.slice(0, displayCount).map((article) => (
            <BestArticleCard
              key={article.id}
              title={article.title}
              createdAt={article.createdAt}
              likeCount={article.likeCount}
              onClick={() => {
                router.push(`/articles/${article.id}`);
              }}
            />
          ))}
        </div>
      </section>

      <section className="px-4 mb-[91px] md:mb-[19px] lg:mb-[293px]">
        <div className="flex justify-between">
          <h2 className="flex items-center text-[18px] text-text-primary-black font-bold">
            게시글
          </h2>
          <div>
            <Link href="/articles/write">
              <Button>글쓰기</Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between gap-[13px] mt-4 md:mt-12 xl:mt-6">
          <SearchInput
            placeholder="검색할 상품을 입력해주세요"
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <Dropdown onSortChange={handleSort} initialValue={sortBy} />
        </div>
        <div className="flex flex-col gap-4 mt-4 md:mt-12 xl:mt-6 mb-23">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : (
            <>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    createdAt={article.createdAt}
                    likeCount={article.likeCount}
                    onClick={() => {
                      router.push(`/articles/${article.id}`);
                    }}
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
