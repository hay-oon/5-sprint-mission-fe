import { api } from "./axios";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface CommentsResponse {
  comments: Comment[];
  nextCursor: string | null;
}

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
