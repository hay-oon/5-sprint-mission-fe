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
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // 에러 처리 로직 (예: 401 에러 시 로그아웃 처리 등)
//     if (error.response && error.response.status === 401) {
//       // 인증 만료 처리
//       if (typeof window !== "undefined") {
//         // localStorage.removeItem("accessToken");
//         // 로그아웃 처리나 토큰 갱신 로직을 여기에 추가할 수 있습니다
//       }
//     }
//     return Promise.reject(error);
//   }
// );
