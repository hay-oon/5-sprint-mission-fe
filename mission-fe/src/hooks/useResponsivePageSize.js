import { useState, useEffect } from "react";

function useResponsivePageSize(sizes = { mobile: 1, tablet: 2, desktop: 4 }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId; // setTimeout 의 반환값을 지정하고, clearTimeout 에 사용하기 위한 변수선언

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300); // 디바운싱, 불 필요한 리렌더링 방지
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (windowWidth <= 768) {
    return sizes.mobile;
  } else if (windowWidth <= 1024) {
    return sizes.tablet;
  } else {
    return sizes.desktop;
  }
}

export default useResponsivePageSize;
