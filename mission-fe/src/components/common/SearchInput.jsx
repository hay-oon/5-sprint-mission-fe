import { useEffect, useState } from "react";
import vectorIcon from "../../assets/icons/Vector.png";

const SearchInput = ({ keyword, setKeyword }) => {
  const [inputValue, setInputValue] = useState(keyword);

  // onChange 이벤트 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 디바운싱 처리
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <div className="searchInput">
      <img src={vectorIcon} alt="검색" className="searchIcon" />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;
