"use client";

import React from "react";
import Image from "next/image";
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  message,
  cancelText = "취소",
  confirmText = "네",
  onConfirm,
}: ConfirmModalProps) {
  // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    onClose(); // 모달 닫기
    onConfirm(); // 확인 동작 실행
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* 모달 배경 */}
      <div className="fixed inset-0 bg-black bg-opacity-65" onClick={onClose} />

      {/* 모달 콘텐츠 */}
      <div className="relative w-full max-w-xs rounded-xl py-10 bg-white p-6 text-left shadow-xl">
        <div className="flex flex-col items-center mb-4">
          <div className="flex justify-center items-center mb-6">
            <Image
              src="/icons/ic_check.png"
              alt="modal"
              width={24}
              height={24}
            />
          </div>
          <p className="text-[16px] text-center font-medium text-primary-black">
            {message}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-[#F74747] bg-white px-6 py-2 text-[16px] font-medium text-[#F74747]"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent px-7 py-2 text-[16px] font-medium text-white"
            style={{ backgroundColor: "#F74747" }}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
