"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { api } from "@/api/axios"; // 기존 API 인스턴스 사용

// 인증 컨텍스트의 타입 정의
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (requestData: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  signup: (
    userData: SignupData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
};

// User 타입 정의
type User = {
  email: string;
  nickname: string;
  image: string | null;
};

// 회원가입 데이터 타입 정의
type SignupData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

// AuthProvider props 타입 정의
type AuthProviderProps = {
  children: ReactNode;
};

// 기본값으로 사용할 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 쿠키를 포함한 요청을 위한 axios 인스턴스
const authAxios = axios.create({
  baseURL: "http://localhost:5005",
  withCredentials: true,
});

// AuthProvider 컴포넌트
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰과 사용자 정보 확인
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        setIsAuthenticated(true);

        // 로컬 스토리지에서 사용자 정보 가져오기
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error("사용자 정보 파싱 오류:", error);
            setUser({
              email: "",
              nickname: "사용자",
              image: null,
            });
          }
        } else {
          setUser({
            email: "",
            nickname: "사용자",
            image: null,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // 로그인 함수
  const login = async (requestData: { email: string; password: string }) => {
    try {
      // 쿠키를 전송하고 받을 수 있도록 withCredentials 옵션이 있는 인스턴스 사용
      const response = await authAxios.post("/api/auth/signin", requestData);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);

      // refreshToken은 쿠키로 설정되지만, 일부 작업을 위해 로컬 스토리지에도 저장
      // (참고: 실제로는 쿠키만 사용하는 것이 더 안전할 수 있음)
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // 사용자 정보 객체 생성
      const userInfo = {
        email: response.data.user.email || requestData.email,
        nickname: response.data.user.nickname || "사용자",
        image: response.data.user.image || null,
      };

      // 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);

      return { success: true, message: "로그인 성공" };
    } catch (error) {
      console.error("로그인 실패:", error);
      let errorMessage = "로그인에 실패했습니다.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }

      return { success: false, message: errorMessage };
    }
  };

  // 회원가입 함수
  const signup = async (userData: SignupData) => {
    try {
      // 쿠키를 포함한 요청을 위해 authAxios 사용
      const response = await authAxios.post("/api/auth/signup", userData);

      // 회원가입 성공 후 자동 로그인 실행
      if (response.status === 200 || response.status === 201) {
        const loginResult = await login({
          email: userData.email,
          password: userData.password,
        });

        // 로그인 실패 시 에러 메시지 반환
        if (!loginResult.success) {
          return {
            success: true,
            message:
              "회원가입은 완료되었으나 자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다.",
          };
        }
      }

      return { success: true, message: "가입이 완료되었습니다." };
    } catch (error) {
      console.error("회원가입 실패:", error);
      let errorMessage = "회원가입에 실패했습니다.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }

      return { success: false, message: errorMessage };
    }
  };

  // 로그아웃 함수
  const logout = () => {
    // 로컬 스토리지 클리어
    localStorage.clear();

    // 쿠키 삭제를 위한 서버 요청 (백엔드에서 지원한다면)
    try {
      authAxios.post("/api/auth/signout");
    } catch (error) {
      console.error("로그아웃 API 오류:", error);
    }

    setIsAuthenticated(false);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// context 사용을 위한 커스텀 훅
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다");
  }

  return context;
}
