import { useState, useRef, useEffect, ReactNode } from "react";

interface MenuOption {
  value: string;
  label: string;
}

interface ContextMenuProps {
  options: MenuOption[];
  onSelect: (value: string) => void;
  trigger: ReactNode;
}

export default function ContextMenu({
  options,
  onSelect,
  trigger,
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border-0 p-0 cursor-pointer"
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full px-3 py-2 text-center text-sm text-text-primary-charcoal hover:bg-gray-100"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
