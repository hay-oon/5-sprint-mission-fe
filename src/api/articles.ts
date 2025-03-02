import { api } from "./axios";

export interface Article {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
}

// 게시글 상세 조회
export const getArticleById = async (id: string): Promise<Article> => {
  const response = await api.get<Article>(`/api/articles/${id}`);
  return response.data;
};

// 게시글 수정 함수
export async function updateArticle(
  id: string,
  data: { title: string; content: string }
): Promise<Article> {
  const response = await api.patch(`/api/articles/${id}`, data);
  return response.data;
}

// 게시글 삭제 함수
export async function deleteArticle(id: string): Promise<void> {
  await api.delete(`/api/articles/${id}`);
}
