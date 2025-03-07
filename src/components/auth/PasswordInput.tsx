"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface PasswordInputProps {
  id: string;
  placeholder: string;
  error?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * 비밀번호 인풋 컴포넌트
 * forwardRef 를 사용하여 부모 컴포넌트에서 인풋 요소에 접근할 수 있도록 함
 */

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ id, placeholder, error, name, onChange, onBlur, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={"w-full"}>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          className={cn(
            "flex w-full px-6 py-4 text-[16px] rounded-[12px] border bg-input-background focus:outline-primary-blue pr-10",
            error ? "border-red-500 focus:outline-red-500" : "border-none"
          )}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm font-semibold text-red-500">{error}</p>
      )}
    </div>
  );
});
