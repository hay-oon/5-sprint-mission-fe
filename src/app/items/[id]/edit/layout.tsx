import React from "react";

export const metadata = {
  title: "상품 수정 - 마켓",
  description: "상품을 수정하세요.",
};

export default function EditProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
