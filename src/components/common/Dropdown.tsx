import { useState } from "react";

interface DropdownProps {
  onSortChange: (value: "latest" | "likes") => void;
  initialValue?: "latest" | "likes";
}

export default function Dropdown({
  onSortChange,
  initialValue = "latest",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<"latest" | "likes">(initialValue);

  const handleSelect = (value: "latest" | "likes") => {
    setSelected(value);
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 h-[38px] min-w-[100px] bg-white border border-gray-300 rounded-lg text-sm whitespace-nowrap"
      >
        {selected === "latest" ? "최신순" : "좋아요순"}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[100px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleSelect("latest")}
          >
            최신순
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleSelect("likes")}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}
