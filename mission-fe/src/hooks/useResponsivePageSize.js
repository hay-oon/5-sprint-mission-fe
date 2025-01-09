import { useState, useEffect } from "react";

function useResponsivePageSize(sizes = { mobile: 1, tablet: 2, desktop: 4 }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300);
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
