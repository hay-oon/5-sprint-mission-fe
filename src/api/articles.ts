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
