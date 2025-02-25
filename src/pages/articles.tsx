import ArticleCard from "@/components/common/ArticleCard";

export default function ArticlesPage() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* 베스트 게시글 섹션 */}
      <section className="mt-4 mb-6 px-4">
        <h2 className="text-[18px] text-text-primary-black font-bold">
          베스트 게시글
        </h2>
        <div className="flex justify-center">
          <ArticleCard
            content="맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야 하나요?"
            nickname="총명한판다"
            createdAt="2025-02-24"
            likeCount={10}
          />
        </div>
        {/* 베스트 게시글 내용 */}
      </section>

      {/* 일반 게시글 섹션 */}
      <section className="px-4">
        <h2 className="text-[18px] text-text-primary-black font-bold">
          최신 게시글
        </h2>
        {/* 일반 게시글 목록 */}
      </section>
    </div>
  );
}
