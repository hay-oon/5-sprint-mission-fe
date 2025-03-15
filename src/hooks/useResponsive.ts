import { useState, useEffect } from "react";

interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export default function useResponsive(): UseResponsiveReturn {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (window.innerWidth >= 768) {
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else {
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      }
    };

    // 초기 실행
    handleResize();

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
}
