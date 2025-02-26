import { api } from "./axios";

export interface Article {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface CommentsResponse {
  comments: Comment[];
  nextCursor: string | null;
}

// 게시글 상세 조회
export const getArticleById = async (id: string): Promise<Article> => {
  const response = await api.get<Article>(`/api/articles/${id}`);
  return response.data;
};

// 댓글 목록 조회
export const getCommentsByArticleId = async (
  articleId: string
): Promise<CommentsResponse> => {
  const response = await api.get<CommentsResponse>(
    `/api/articles/${articleId}/comments`
  );
  return response.data;
};

// 댓글 작성
export const createComment = async (
  articleId: string,
  content: string
): Promise<void> => {
  await api.post(`/api/articles/${articleId}/comments`, { content });
};

// 댓글 수정 함수
export async function updateComment(
  commentId: string,
  content: string
): Promise<void> {
  await api.patch(`/api/comments/${commentId}`, {
    content,
  });
}

// 댓글 삭제 함수
export async function deleteComment(commentId: string): Promise<void> {
  await api.delete(`/api/comments/${commentId}`);
}

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
