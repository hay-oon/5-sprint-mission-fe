"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import vectorIcon from "@public/icons/Vector.png";

// props 타입 정의
interface SearchInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  keyword,
  setKeyword,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState<string>(keyword);

  // onChange 이벤트 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
  }, [inputValue, setKeyword]);

  return (
    <div className="relative w-full h-full">
      <Image
        src={vectorIcon}
        alt="검색"
        width={15}
        height={15}
        className="absolute top-1/2 left-6 -translate-y-1/2 z-10"
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full h-full pl-[48px] py-[9px] text-md bg-gray-100 text-gray-400 border-none rounded-xl font-normal"
      />
    </div>
  );
};

export default SearchInput;
