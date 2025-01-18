import { useState, useEffect } from "react";

export const useProductValidation = (product) => {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    validateFields();
  }, [product]);

  const validateFields = () => {
    const newErrors = {
      name: "",
      description: "",
      price: "",
    };

    // 상품명 검증
    if (product.name && (product.name.length < 1 || product.name.length > 10)) {
      newErrors.name = "10자 이내로 입력해주세요";
    }

    // 상품 소개 검증
    if (
      product.description &&
      (product.description.length < 10 || product.description.length > 100)
    ) {
      newErrors.description = "10자 이상 입력해주세요";
    }

    // 가격 검증
    if (product.price) {
      if (!/^\d+$/.test(product.price)) {
        // /^\d+$/ => "문자열 전체가 숫자로만 이루어져 있어야 함"
        newErrors.price = "숫자로 입력해주세요";
      }
    }

    setErrors(newErrors);
  };

  const validateTag = (tag) => {
    if (tag.length > 5) {
      return "5글자 이내로 입력해주세요";
    }
    return "";
  };

  return { errors, validateTag };
};
