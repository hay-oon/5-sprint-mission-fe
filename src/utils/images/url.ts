import { api } from "@/api/axios";

// 백엔드에서 전달된 이미지 경로를 완전한 URL로 변환
export const getImageUrl = (
  imagePath: string | undefined,
  defaultImage?: string
): string => {
  if (!imagePath) return defaultImage || "";
  if (imagePath.startsWith("http")) return imagePath;

  const baseUrl = api.defaults.baseURL || "http://localhost:5005";

  return imagePath.startsWith("/")
    ? `${baseUrl}${imagePath}`
    : `${baseUrl}/${imagePath}`;
};
