"use client"; // Next.js 13+에서 클라이언트 컴포넌트로 선언

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@public/images/logo/logo.svg";
import mobileLogo from "@public/images/logo/headerlogo_mobile.png";
import NavMenu from "@/components/navigation/NavMenu";
import Button from "@/components/common/Button";

const Header = () => {
  const pathname = usePathname(); // 현재 경로 가져오기
  const isItemsPage = pathname.startsWith("/items"); // 현재 페이지가 '/items'인지 확인
  const isArticlesPage = pathname.startsWith("/articles"); // articles 페이지 여부 확인
  const isRootPage = pathname === "/"; // 루트 페이지 여부 확인

  return (
    <header className="fixed top-0 left-0 w-full h-[var(--header-height)] flex justify-between items-center py-2 px-4 bg-white border-b border-gray-300 z-50 sm:py-[11px] sm:px-6 md:px-10 lg:px-[200px]">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          {/* 모바일 로고 (기본) */}
          <Image
            src={mobileLogo}
            alt="판다마켓 홈"
            width={80}
            height={40}
            className="block md:hidden"
          />
          {/* 데스크탑 로고 */}
          <Image
            src={logo}
            alt="판다마켓 홈"
            width={153}
            height={40}
            className="hidden md:block"
          />
        </Link>
        {!isRootPage && (
          <nav className="ml-2 sm:ml-4 md:ml-6">
            <NavMenu isActive={isArticlesPage} to="/articles">
              자유게시판
            </NavMenu>
            <NavMenu isActive={isItemsPage} to="/items">
              중고마켓
            </NavMenu>
          </nav>
        )}
      </div>

      <div className="flex items-center">
        <Button className="text-sm sm:text-base">로그인</Button>
      </div>
    </header>
  );
};

export default Header;
