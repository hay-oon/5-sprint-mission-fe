import { useState } from "react";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import "./Registration.css";
import Button from "../../common/Button";

const BASE_URL = "https://five-sprint-mission-be.onrender.com/api/products";

function Registration() {
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Header />
      <div className="registration-container">
        <div className="registration-header">
          <h2>상품 등록하기</h2>
          <Button className="button registration-button inactive">등록</Button>
        </div>
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>상품명</label>
            <input type="text" placeholder="상품명을 입력해주세요" />
          </div>

          <div className="form-group">
            <label>상품 소개</label>
            <textarea placeholder="상품 소개를 입력해주세요" rows={10} />
          </div>

          <div className="form-group">
            <label>판매가격</label>
            <input type="number" placeholder="판매 가격을 입력해주세요" />
          </div>

          <div className="form-group">
            <label>태그</label>
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              onKeyPress={handleAddTag}
            />
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="remove-tag"
                  >
                    ×
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
