"use client";
import { useState, useEffect } from "react";

interface PageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
}

function useResponsivePageSize(
  sizes: PageSizes = { mobile: 1, tablet: 2, desktop: 4 }
): number {
  // 서버 사이드 렌더링 시 기본값으로 desktop 사이즈 사용
  const [pageSize, setPageSize] = useState<number>(sizes.desktop);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === "undefined") return;

    // 초기 윈도우 너비에 따른 페이지 사이즈 설정
    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width <= 768) {
        setPageSize(sizes.mobile);
      } else if (width <= 1024) {
        setPageSize(sizes.tablet);
      } else {
        setPageSize(sizes.desktop);
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sizes]); // sizes가 변경될 때만 useEffect 재실행

  return pageSize;
}

export default useResponsivePageSize;
