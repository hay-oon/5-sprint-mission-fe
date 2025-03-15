"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/api/axios";
import NotFound from "@/app/not-found";
import EditProductClient from "./EditProductClient";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("상품을 불러오는데 실패했습니다:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  return <EditProductClient product={product} />;
}
