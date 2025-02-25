"use client";
import ArticleCard from "@/components/common/ArticleCard";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import { useState } from "react";
import Dropdown from "@/components/common/Dropdown";

export default function ArticlesPage() {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "likes">("latest");

  const handleSort = (value: "latest" | "likes") => {
    setSortBy(value);
    // TODO: 정렬 로직 구현
  };

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
      </section>
    </div>
  );
}
