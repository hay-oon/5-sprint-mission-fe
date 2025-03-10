"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api/axios";
import Image from "next/image";
import defaultImage from "@public/icons/img_default.png";
import Button from "@/components/common/Button";

interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  description: string;
  tags?: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}

interface EditProductClientProps {
  product: Product;
}

export default function EditProductClient({ product }: EditProductClientProps) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [tags, setTags] = useState(product.tags?.join(", ") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async () => {
    if (!name || !price || !description) {
      alert("상품명, 가격, 설명을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // 태그 처리
      const tagArray = tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      await api.patch(`/products/${product.id}`, {
        name,
        price: Number(price),
        description,
        tags: tagArray,
      });

      // 수정 완료 후 상세 페이지로 이동
      router.push(`/items/${product.id}`);
      alert("상품이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("상품 수정 실패:", error);
      setError("상품 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">상품 수정하기</h1>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-blue text-white font-semibold rounded-3xl hover:bg-primary-dark disabled:opacity-50"
          >
            {isSubmitting ? "수정 중..." : "수정"}
          </Button>
        </div>

        <div className="mb-4">
          <Image
            src={product.images?.[0] || defaultImage.src}
            alt={product.name}
            width={200}
            height={200}
            className="aspect-square border border-gray-300 rounded-2xl mb-4 object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = defaultImage.src;
            }}
            unoptimized
          />
          <p className="text-sm text-gray-500">
            * 이미지는 수정할 수 없습니다.
          </p>
        </div>

        <div>
          <label htmlFor="name" className="block mb-2 text-[18px] font-bold">
            상품명
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-4 px-6 bg-input-background border-none rounded-xl"
            placeholder="상품명을 입력해주세요"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-[18px] font-bold"
          >
            상품 소개
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-4 px-6 bg-input-background border-none rounded-xl min-h-[200px]"
            placeholder="상품 소개를 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 text-[18px] font-bold">
            가격
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full py-4 px-6 bg-input-background border-none rounded-xl"
            placeholder="가격을 입력해주세요"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block mb-2 text-[18px] font-bold">
            태그
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full py-4 px-6 bg-input-background border-none rounded-xl"
            placeholder="태그를 쉼표(,)로 구분하여 입력해주세요"
          />
          <p className="text-sm text-gray-500 mt-1">
            예: 전자제품, 가전, 스마트폰
          </p>
        </div>
      </form>
    </div>
  );
}
