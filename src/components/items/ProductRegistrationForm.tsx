"use client";

import { useState, useCallback, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Image from "next/image";
import { createProduct, updateProduct, ProductFormData } from "@/api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import xIcon from "@public/icons/ic_X.png";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import defaultImage from "@public/icons/img_default.png";

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

interface ProductRegistrationFormProps {
  product?: Product;
  isEdit?: boolean;
  onEditComplete?: () => void;
}

const ProductRegistrationForm: React.FC<ProductRegistrationFormProps> = ({
  product,
  isEdit = false,
  onEditComplete,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    images: product?.images || [],
    tags: product?.tags || [],
  });

  const [tagInput, setTagInput] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string[]>(
    product?.images || []
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 각 필드별 유효성 검사 에러 상태 추가
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [tagError, setTagError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(isEdit); // 수정 모드일 경우 초기값은 유효함

  // 상품 등록/수정 API 호출
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // 등록 성공 시 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // 목록 페이지로 이동
      router.push("/");
      alert("상품이 성공적으로 등록되었습니다.");
    },
    onError: (error: any) => {
      setError(error.message || "상품 등록에 실패했습니다.");
      setIsSubmitting(false);
    },
  });

  // 상품 수정 API 호출
  const updateMutation = useMutation({
    mutationFn: (data: ProductFormData) =>
      updateProduct(product?.id || "", data),
    onSuccess: () => {
      // 수정 성공 시 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // onEditComplete 함수가 있으면 호출
      if (onEditComplete) {
        onEditComplete();
      } else {
        // 기존 동작: 상세 페이지로 이동
        router.push(`/items/${product?.id}`);
      }

      alert("상품이 성공적으로 수정되었습니다.");
    },
    onError: (error: any) => {
      setError(error.message || "상품 수정에 실패했습니다.");
      setIsSubmitting(false);
    },
  });

  // 유효성 검사 함수 추가
  const validateForm = useCallback(() => {
    // 모든 유효성 검사 조건 확인
    const isNameValid =
      formData.name.trim() !== "" && formData.name.length <= 10;
    const isDescriptionValid =
      formData.description.trim() !== "" &&
      formData.description.trim().length >= 10;
    const isPriceValid = formData.price > 0;

    // 모든 조건이 충족되면 폼이 유효함
    const isValid = isNameValid && isDescriptionValid && isPriceValid;
    setIsFormValid(isValid);
  }, [formData]);

  // 입력 필드 변경 처리
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      if (name === "price") {
        // 콤마를 제거하고 숫자로 변환
        const unformattedValue = value.replace(/,/g, "");

        // 숫자가 아닌 값이 입력되었는지 검사
        if (unformattedValue && !/^\d+$/.test(unformattedValue)) {
          setPriceError("숫자로 입력해주세요");
        } else {
          setPriceError(null);
        }

        const numberValue = unformattedValue
          ? parseInt(unformattedValue, 10)
          : 0;
        setFormData((prev) => ({
          ...prev,
          [name]: isNaN(numberValue) ? 0 : numberValue,
        }));
      } else if (name === "name") {
        // 상품명 길이 검사 (10자 이내)
        if (!value.trim()) {
          setNameError("상품명을 입력해주세요");
        } else if (value.length > 10) {
          setNameError("10자 이내로 입력해주세요");
        } else {
          setNameError(null);
        }
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else if (name === "description") {
        // 상품 소개 길이 검사 (10자 이상)
        if (!value.trim()) {
          setDescriptionError("상품 설명을 입력해주세요");
        } else if (value.trim().length < 10) {
          setDescriptionError("10자 이상 입력해주세요");
        } else {
          setDescriptionError(null);
        }
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  // 태그 입력 처리
  const handleTagInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // 태그 길이 검사 (5자 이내)
      if (value.length > 5) {
        setTagError("5글자 이내로 입력해주세요");
      } else {
        setTagError("");
      }

      setTagInput(value);
    },
    []
  );

  // 태그 추가 처리
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!tagInput.trim()) return;

      // 태그 길이 검사 (5자 이내)
      if (tagInput.trim().length > 5) {
        setTagError("5글자 이내로 입력해주세요");
        return;
      }

      // 중복 태그 검사 추가
      if (formData.tags && formData.tags.includes(tagInput.trim())) {
        setTagError("이미 추가된 태그입니다");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));

      // 입력 필드 초기화
      setTagInput("");
      setTagError("");
    }
  };

  // 태그 삭제 처리
  const handleRemoveTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((_, index) => index !== indexToRemove),
    }));
  };

  // 이미지 업로드 처리 (모의 구현)
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      // 최대 3개의 이미지만 허용
      if (imagePreview.length >= 3) {
        alert("이미지는 최대 3개까지 등록 가능합니다.");
        return;
      }
      try {
        // 실제로는 이미지 업로드 API를 호출하고 URL을 받아야 함
        // 여기서는 예시로 고정된 URL을 사용 (실제 구현시에는 서버 API 호출 필요)
        const newImagePreviewUrls: string[] = [];
        const newImageUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
          // 로컬 미리보기용 URL 생성
          const localPreviewUrl = URL.createObjectURL(files[i]);
          newImagePreviewUrls.push(localPreviewUrl);

          // 실제로는 서버 업로드 후 반환받은 URL을 사용해야 함
          const imageUrl = `https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/example-image-${Date.now()}-${i}.jpg`;
          newImageUrls.push(imageUrl);
        }

        setImagePreview((prev) => [...prev, ...newImagePreviewUrls]);

        // 서버에 전송할 실제 URL 저장
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newImageUrls],
        }));
      } catch (error) {
        console.error("이미지 처리 중 오류 발생:", error);
        alert("이미지 처리 중 오류가 발생했습니다. 기본 이미지가 사용됩니다.");
        // 에러 발생 시에도 폼 제출은 가능하도록 images 배열은 비워둠
        setFormData((prev) => ({
          ...prev,
          images: [],
        }));
      }
    },
    [imagePreview]
  );

  // 이미지 삭제 처리
  const handleRemoveImage = useCallback((index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  }, []);

  // 폼 제출 처리
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isFormValid) {
        alert("입력 내용을 확인해주세요.");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      // 이미지가 없는 경우 기본 이미지 URL 설정
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.images?.length) {
        dataToSubmit.images = [
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/default-product-image.jpg",
        ];
      }

      // API 호출 (등록 또는 수정)
      if (isEdit && product) {
        updateMutation.mutate(dataToSubmit);
      } else {
        createMutation.mutate(dataToSubmit);
      }
    },
    [formData, createMutation, updateMutation, isEdit, product, isFormValid]
  );

  // formData가 변경될 때마다 유효성 검사 실행
  useEffect(() => {
    validateForm();
  }, [validateForm, formData]);

  return (
    <section className="max-w-[1200px] px-6 py-10 mb-[120px] mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">
            {isEdit ? "상품 수정하기" : "상품 등록하기"}
          </h2>
        </div>
        <div>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as any);
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md"
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size={4} />
                <span className="ml-2">
                  {isEdit ? "수정 중..." : "등록 중..."}
                </span>
              </>
            ) : isEdit ? (
              "수정"
            ) : (
              "등록"
            )}
          </Button>
        </div>
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className="block text-[18px] font-bold text-primary-black mb-1">
          상품 이미지
        </label>

        <div className="flex flex-wrap gap-2 mt-2">
          {/* 이미지 추가 버튼 */}
          <label
            htmlFor="imageUpload"
            className="w-[282px] h-[282px] bg-input-background border border-none rounded-[12px] flex items-center justify-center cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="text-6xl text-gray-300">+</div>
              <span className="text-sm text-gray-500">이미지 등록</span>
            </div>
            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* 이미지 미리보기 */}
          {imagePreview.map((url, index) => (
            <div
              key={`img-${index}`}
              className="relative w-[282px] h-[282px] border border-none rounded-[12px] overflow-hidden"
            >
              <Image
                src={url || defaultImage.src}
                alt={`상품 이미지 ${index + 1}`}
                width={282}
                height={282}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = defaultImage.src;
                }}
                unoptimized
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2"
              >
                <Image src={xIcon} alt="x" width={22} height={24} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-sm text-red-500 mt-4">
          *이미지 등록은 최대 3개까지 가능합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* 상품명 */}
        <div>
          <label
            htmlFor="name"
            className="block text-[18px] font-bold text-primary-black mb-4"
          >
            상품명
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            className={`block w-full px-6 py-4 bg-input-background border ${
              nameError ? "border-red-500" : "border-none"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            required
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-2">{nameError}</p>
          )}
        </div>

        {/* 상품 소개 */}
        <div>
          <label
            htmlFor="description"
            className="block text-[18px] font-bold text-primary-black mb-4"
          >
            상품 소개
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="상품 소개를 입력해주세요"
            className={`block w-full px-6 py-4 bg-input-background border ${
              descriptionError ? "border-red-500" : "border-none"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            required
          />
          {descriptionError && (
            <p className="text-red-500 text-sm mt-2">{descriptionError}</p>
          )}
        </div>

        {/* 가격 */}
        <div>
          <label
            htmlFor="price"
            className="block text-[18px] font-bold text-primary-black mb-4"
          >
            판매 가격
          </label>
          <input
            type="text"
            name="price"
            value={formData.price === 0 ? "" : formData.price.toLocaleString()}
            onChange={handleChange}
            placeholder="판매 가격을 입력해주세요"
            className={`w-full px-6 py-4 rounded-md bg-input-background ${
              priceError ? "border border-red-500" : "border-none"
            }`}
          />
          {priceError && (
            <p className="text-red-500 text-sm mt-2">{priceError}</p>
          )}
        </div>

        {/* 태그 목록 */}
        <div>
          <label className="block text-[18px] font-bold text-primary-black mb-4">
            태그
          </label>
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={addTag} // onKeyDown 적용시 버그있음
            className={`w-full px-6 py-4 rounded-md bg-input-background ${
              tagError ? "border border-red-500" : "border-none"
            }`}
          />
          {tagError && <p className="text-red-500 text-sm mt-2">{tagError}</p>}
          <div className="flex flex-wrap gap-2 mt-3">
            {(formData.tags || []).map((tag, index) => (
              <span
                key={`tag-${tag}-${index}`}
                className="flex items-center font-primary-black bg-input-background px-4 py-[6px] rounded-full text-4"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2"
                >
                  <Image src={xIcon} width={16} height={16} alt="close" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProductRegistrationForm;
