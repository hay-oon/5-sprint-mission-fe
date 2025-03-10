import axios from "axios";

export const api = axios.create({
  // baseURL: "https://five-sprint-mission-be.onrender.com",
  baseURL: "https://panda-market-api.vercel.app",
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
        // 클라이언트 사이드에서만 localStorage에 접근
        if (typeof window !== "undefined") {
          const refreshToken = localStorage.getItem("refreshToken");

          if (refreshToken) {
            // 리프레시 토큰으로 새 액세스 토큰 요청
            const response = await axios.post(
              "https://panda-market-api.vercel.app/auth/refresh-token",
              { refreshToken }
            );

            // 새 토큰 저장
            if (response.data.accessToken) {
              localStorage.setItem("accessToken", response.data.accessToken);

              // 새 액세스 토큰으로 헤더 업데이트
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

              // 원래 요청 재시도
              return axios(originalRequest);
            }
          }
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);

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
