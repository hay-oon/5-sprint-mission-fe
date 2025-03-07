"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ id, className, type, error, placeholder, ...props }, ref) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex w-full px-6 py-4 text-[16px] rounded-[12px] border bg-input-background focus:outline-primary-blue",
          error ? "border-red-500 focus:outline-red-500" : "border-none",
          className
        )}
        {...props}
        ref={ref}
      />
      {error && (
        <p className="mt-1 text-sm font-semibold text-red-500">{error}</p>
      )}
    </>
  );
});

export { Input };
