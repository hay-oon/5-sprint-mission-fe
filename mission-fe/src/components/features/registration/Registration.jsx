import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import "./Registration.css";
import Button from "../../common/Button";
import xIcon from "../../../assets/icons/ic_X.png";
import { useProductValidation } from "../../../hooks/useProductValidation";

const BASE_URL = "https://five-sprint-mission-be.onrender.com/api/products";

function Registration() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [tagError, setTagError] = useState("");
  const { errors, validateTag } = useProductValidation(product);

  const handleInput = (e) => {
    const { name, value } = e.target; // input 태그의 name과 value를 가져온다.
    setProduct({
      ...product,
      [name]: value, // product 객체에 name과 value를 할당
    });
  };

  // onkeypress 이벤트 핸들러
  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault(); // 폼 제출 시 기본 동작 방지
      const newTag = e.target.value.trim();
      const tagError = validateTag(newTag);

      // 2-1. 태그 유효성 검사 실패 시
      if (tagError) {
        setTagError(tagError);
        return;
      }

      // 2-2. 태그 유효성 검사 통과 시
      setTagError("");
      setProduct({
        ...product,
        tags: [...product.tags, newTag],
      });
      setTimeout(() => {
        e.target.value = "";
      }, 0); // 마지막에 문자가 비워지지 않는 오류가 발생하여 비동기 처리로 해결
    }
  };

  // 태그 삭제 함수: 삭제할 인덱스와 일치하지 않는 배열만 반환
  const handleRemoveTag = (indexToRemove) => {
    setProduct({
      ...product,
      tags: product.tags.filter((_, index) => index !== indexToRemove), //_의 의미: 배열의 값이 필요 없을 때 사용
    });
  };

  const registerProduct = async (e) => {
    e.preventDefault(); // 폼 제출 시 기본 동작 방지

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const result = await response.json();
        alert("상품이 등록되었습니다!");
        navigate(`/products/${result.id}`);
      } else {
        alert("등록에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
  };

  const isFormValid = () => {
    return (
      product.name &&
      product.description &&
      product.price &&
      !errors.name &&
      !errors.description &&
      !errors.price
    );
  };

  return (
    <>
      <Header />
      <div className="registration-container">
        <div className="registration-header">
          <h2>상품 등록하기</h2>
          <Button
            className={`button registration-button ${
              !isFormValid() ? "inactive" : ""
            }`}
            onClick={registerProduct}
            disabled={!isFormValid()}
          >
            등록
          </Button>
        </div>
        <form id="registration-form" onSubmit={registerProduct}>
          <div className="form-group">
            <label>상품명</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInput}
              placeholder="상품명을 입력해주세요"
              className={errors.name ? "error" : ""}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>상품 소개</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInput}
              placeholder="상품 소개를 입력해주세요"
              rows={10}
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label>판매 가격</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInput}
              placeholder="판매 가격을 입력해주세요"
              className={errors.price ? "error" : ""}
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label>태그</label>
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              onKeyPress={addTag} //Enter 키 이벤트 발생 시 addTag 호출 , onKeyDown 이벤트 핸들러 사용시 두번씩 호출되는 오류 발생
              className={tagError ? "error" : ""}
            />
            {tagError && <p className="error-message">{tagError}</p>}
            <div className="tags-container">
              {product.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                  <button type="button" onClick={() => handleRemoveTag(index)}>
                    <img src={xIcon} width={22} height={24} alt="close" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Registration;
