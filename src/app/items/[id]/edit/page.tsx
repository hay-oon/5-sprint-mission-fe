"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import ProductRegistrationForm from "@/components/items/ProductRegistrationForm";
import { getProductById, Product } from "@/api/products";
import { useQueryClient } from "@tanstack/react-query";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id as string);
        setProduct(productData);
      } catch (err) {
        console.error("상품을 불러오는데 실패했습니다:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 상품 수정 후 상세 페이지로 이동
  const handleEditComplete = () => {
    // 상품 데이터 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ["product", id] });
    router.push(`/items/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        로딩 중...
      </div>
    );
  }

  if (error || !product) {
    return <NotFound />;
  }

  return (
    <ProductRegistrationForm
      product={product}
      isEdit={true}
      onEditComplete={handleEditComplete}
    />
  );
}
