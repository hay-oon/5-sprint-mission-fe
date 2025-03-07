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

/**
 * zod 유효성 검사 스키마 정의
 * 해당 타입 정의를 통해 form 의 데이터 타입을 제한할 수 있음
 * react hook form 의 resolver 에 해당 스키마를 전달하여 유효성 검사를 수행
 * refine : 비밀번호 확인 일치 검사
 */
const signupSchema = z
  .object({
    email: z.string().email("잘못된 이메일 주소입니다."),
    nickname: z
      .string()
      .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
      .max(10, "닉네임은 최대 10자까지 가능합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

/**
 * react-hook-form
 * zodResolver 를 사용하여 zod 스키마를 사용하여 유효성 검사를 수행
 * mode 를 onChange 로 설정하여 입력값이 변경될 때마다 유효성 검사를 수행
 * defaultValues 를 설정하여 초기 값을 설정
 */
export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // 회원가입 로직 구현
      console.log("회원가입 시도:", data);
      // 여기에 API 호출 로직 추가
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const { isMobile } = useResponsive();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6 ">
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
      <div className="w-full max-w-[640px] space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                htmlFor="nickname"
                className="block text-[18px] font-bold text-primary-black mb-4"
              >
                닉네임
              </label>
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                error={errors.nickname?.message}
                {...register("nickname")}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[18px] font-bold text-primary-black mb-4"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[18px] font-bold text-primary-black mb-4"
              >
                비밀번호 확인
              </label>
              <PasswordInput
                id="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full ${
              isValid ? "bg-primary-blue" : "bg-gray-400"
            } text-white font-semibold text-[20px] rounded-[40px] py-[12px] px-[124px] transition-colors`}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>

          <SocialLogin />
        </form>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
