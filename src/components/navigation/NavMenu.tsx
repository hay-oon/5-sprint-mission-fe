import Link from "next/link";
import { ReactNode } from "react";

// Props 타입 정의
interface NavMenuProps {
  children: ReactNode;
  isActive: boolean;
  to: string;
}

const NavMenu = ({ children, isActive, to }: NavMenuProps) => {
  return (
    <Link
      href={to}
      className={`px-6 py-5 text-lg font-bold text-gray-700 no-underline transition-colors ${
        isActive ? "text-primary-blue" : "hover:text-primary-blue"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavMenu;
