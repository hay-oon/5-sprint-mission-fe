"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/auth/input";
import { PasswordInput } from "@/components/auth/PasswordInput";
import SocialLogin from "@/components/ui/SocialLogin";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";

/**
 * zod 유효성 검사 스키마 정의
 * 해당 타입 정의를 통해 form 의 데이터 타입을 제한할 수 있음
 * react hook form 의 resolver 에 해당 스키마를 전달하여 유효성 검사를 수행
 */
const loginSchema = z.object({
  email: z.string().email("잘못된 이메일 주소입니다."),
  password: z.string().min(8, "비밀번호를 최소 8자 이상 입력해주세요."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * react-hook-form
 * zodResolver 를 사용하여 zod 스키마를 사용하여 유효성 검사를 수행
 * mode 를 onChange 로 설정하여 입력값이 변경될 때마다 유효성 검사를 수행
 * defaultValues 를 설정하여 초기 값을 설정
 */
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, loading } = useAuth();

  /**
   * 페이지 로드 시 로컬 스토리지에 accessToken이 있는 경우 '/items' 페이지로 리다이렉트
   * 리다이렉트 전 로그인 페이지가 반복 렌더링 되는 것을 방지하기 위해 isLoading 상태 사용
   */
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/items");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormValues) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(requestData);
      if (result.success) {
        router.push("/items");
      } else {
        setErrorMessage(result.message);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("로그인에 실패했습니다.");
      setIsModalOpen(true);
    }
  };

  const { isMobile } = useResponsive();

  // 로딩 중일 때는 아무것도 표시하지 않음
  if (loading) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={errorMessage}
        buttonText="확인"
      />

      <div>
        {isMobile ? (
          <Image
            src="/images/logo/logo_mb.png"
            alt="logo"
            width={198}
            height={66}
          />
        ) : (
          <Image
            src="/images/logo/logo_pc.png"
            alt="logo"
            width={396}
            height={132}
          />
        )}
      </div>
      <div className="w-full max-w-[640px]">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-[18px] font-bold text-primary-black mb-4"
            >
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[18px] font-bold text-primary-black mb-4 "
            >
              비밀번호
            </label>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력하세요"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              isValid ? "bg-primary-blue" : "bg-gray-400"
            } text-white font-semibold text-[20px] rounded-[40px] py-[12px] px-[124px] transition-colors`}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <SocialLogin />
        </form>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        판다마켓이 처음이신가요?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
