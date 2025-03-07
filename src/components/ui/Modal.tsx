"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  message,
  buttonText = "확인",
  onButtonClick,
}: ModalProps) {
  // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    onClose(); // 기본적으로 모달 닫기
    if (onButtonClick) {
      onButtonClick(); // 추가 동작 실행
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* 모달 배경 */}
      <div className="fixed inset-0 bg-black bg-opacity-65" />

      {/* 모달 콘텐츠 */}
      <div className="relative w-full max-w-md rounded-xl py-14 bg-white p-6 text-left shadow-xl">
        <div>
          <p className="text-sm text-center text-bold text-primary-black">
            {message}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-blue px-8 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
