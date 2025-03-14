import { api } from "./axios";

export interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  description: string;
  tags?: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface ProductsResponse {
  list: Product[];
  nextCursor: number | null;
  totalCount?: number;
}

export interface CommentsResponse {
  list: Comment[];
  nextCursor: number | null;
}

export interface Comment {
  id: string;
  writer: {
    id: string;
    image?: string;
    nickname: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 상품 목록 조회
export const getProducts = async (
  cursor?: number | null,
  limit: number = 10
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  if (cursor) {
    params.append("cursor", cursor.toString());
  }

  const response = await api.get<ProductsResponse>(
    `/products?${params.toString()}`
  );
  return response.data;
};

// 페이지네이션 방식의 상품 목록 조회
export const getProductsByPage = async (
  page: number = 1,
  pageSize: number = 10,
  orderBy: string = "recent",
  keyword: string = ""
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  params.append("orderBy", orderBy);
  if (keyword) {
    params.append("keyword", keyword);
  }

  const response = await api.get<ProductsResponse>(
    `/products?${params.toString()}`
  );
  return response.data;
};

// 베스트 상품 목록 조회
export const getBestProducts = async (
  pageSize: number = 4
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  params.append("page", "1");
  params.append("pageSize", pageSize.toString());
  params.append("orderBy", "favorite");

  const response = await api.get<ProductsResponse>(
    `/products?${params.toString()}`
  );
  return response.data;
};

// 상품 상세 조회
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// 상품 댓글 조회
export const getProductComments = async (
  productId: string,
  cursor?: number | null,
  limit: number = 5
): Promise<CommentsResponse> => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  if (cursor) {
    params.append("cursor", cursor.toString());
  }

  const response = await api.get<CommentsResponse>(
    `/products/${productId}/comments?${params.toString()}`
  );
  return response.data;
};

// 댓글 작성
export const createProductComment = async (
  productId: string,
  content: string
): Promise<void> => {
  await api.post(`/products/${productId}/comments`, { content });
};

// 댓글 수정
export const updateProductComment = async (
  commentId: string,
  content: string
): Promise<void> => {
  await api.patch(`/comments/${commentId}`, { content });
};

// 댓글 삭제
export const deleteProductComment = async (
  commentId: string
): Promise<void> => {
  await api.delete(`/comments/${commentId}`);
};

// 좋아요 추가
export const addFavorite = async (productId: string): Promise<void> => {
  await api.post(`/products/${productId}/favorite`);
};

// 좋아요 삭제
export const removeFavorite = async (productId: string): Promise<void> => {
  await api.delete(`/products/${productId}/favorite`);
};

// 상품 삭제
export const deleteProduct = async (productId: string): Promise<void> => {
  await api.delete(`/products/${productId}`);
};
