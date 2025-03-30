import axios from "axios";

export const api = axios.create({
  baseURL: "https://five-sprint-mission-be.onrender.com",
  // baseURL: "http://localhost:5005",
  // baseURL: "https://panda-market-api.vercel.app",
  withCredentials: true, // 쿠키를 포함한 요청을 위해 필요
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // 클라이언트 사이드에서만 localStorage에 접근
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 원래 요청의 설정 저장
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 백엔드 컨트롤러와 일치하는 엔드포인트 사용
        // refreshToken 함수가 백엔드에서 사용되므로 refresh-token 엔드포인트 사용
        // 쿠키에서 자동으로 리프레시 토큰을 읽어오므로 요청 본문은 비움
        console.log("토큰 갱신 시도");
        const response = await api.post("/api/auth/refresh-token");

        console.log("토큰 갱신 응답:", response.data);

        // 새 토큰 저장
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);

          // 새 리프레시 토큰이 있다면 저장 (백엔드에서는 쿠키에도 설정됨)
          if (response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }

          // 새 액세스 토큰으로 헤더 업데이트
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

          // 원래 요청 재시도
          return api(originalRequest);
        }
      } catch (refreshError: any) {
        console.error("토큰 갱신 실패:", refreshError);
        console.error("상세 오류:", refreshError.response?.data);

        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          // 로그인 페이지로 리다이렉트
          window.location.href = "/auth/login";
        }
      }
    }

    return Promise.reject(error);
  }
);
