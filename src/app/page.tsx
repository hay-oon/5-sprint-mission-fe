import Banner from "@/components/home/Banner";
import TopBannerImage from "@public/images/home/top-banner-image.png";
import BottomBannerImage from "@public/images/home/bottom-banner-image.png";
import ContentSection from "@/components/home/ContentSection";
import Feature1Image from "@public/images/home/feature1-image.png";
import Feature2Image from "@public/images/home/feature2-image.png";
import Feature3Image from "@public/images/home/feature3-image.png";
import TextContent from "@/components/home/TextContent";
import Link from "next/link";
import { getBestProducts, getProductsByPage } from "@/api/products";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  // 서버 사이드에서 QueryClient 인스턴스 생성
  const queryClient = new QueryClient();

  // 베스트 상품 데이터 prefetching (모바일, 태블릿, 데스크톱 크기별로)
  await Promise.all([
    // 모바일 크기 (1개)
    queryClient.prefetchQuery({
      queryKey: ["bestProducts", 1],
      queryFn: () => getBestProducts(1),
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    }),
    // 태블릿 크기 (2개)
    queryClient.prefetchQuery({
      queryKey: ["bestProducts", 2],
      queryFn: () => getBestProducts(2),
      staleTime: 1000 * 60 * 5,
    }),
    // 데스크톱 크기 (4개)
    queryClient.prefetchQuery({
      queryKey: ["bestProducts", 4],
      queryFn: () => getBestProducts(4),
      staleTime: 1000 * 60 * 5,
    }),
  ]);

  // 판매중인 상품 데이터 prefetching (모바일, 태블릿, 데스크톱 크기별로)
  await Promise.all([
    // 모바일 크기 (4개)
    queryClient.prefetchQuery({
      queryKey: ["products", 1, 4, "recent", ""],
      queryFn: () => getProductsByPage(1, 4, "recent", ""),
      staleTime: 1000 * 60 * 2,
    }),
    // 태블릿 크기 (6개)
    queryClient.prefetchQuery({
      queryKey: ["products", 1, 6, "recent", ""],
      queryFn: () => getProductsByPage(1, 6, "recent", ""),
      staleTime: 1000 * 60 * 2,
    }),
    // 데스크톱 크기 (10개)
    queryClient.prefetchQuery({
      queryKey: ["products", 1, 10, "recent", ""],
      queryFn: () => getProductsByPage(1, 10, "recent", ""),
      staleTime: 1000 * 60 * 2,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full">
        <Banner image={TopBannerImage}>
          <div className="text-[32px] md:text-[40px] xl:text-[40px] font-bold mb-8 break-keep text-center md:text-center xl:text-left">
            일상의 모든 물건을 거래해보세요
          </div>
          <Link href="/items" prefetch={true}>
            <button className="bg-primary-blue text-white font-semibold rounded-full text-lg md:text-xl xl:text-xl h-[48px] md:h-[56px] xl:h-[56px] w-[240px] md:w-[357px] xl:w-[357px]">
              구경하러 가기
            </button>
          </Link>
        </Banner>
        <ContentSection align="left" image={Feature1Image}>
          <TextContent
            subTitle="Hot item"
            title="인기 상품을 확인해보세요"
            description="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
            align="left"
          />
        </ContentSection>
        <ContentSection align="right" image={Feature2Image}>
          <TextContent
            subTitle="Search"
            title="구매를 원하는 상품을 검색하세요"
            description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
            align="right"
          />
        </ContentSection>
        <ContentSection align="left" image={Feature3Image}>
          <TextContent
            subTitle="Register"
            title="판매를 원하는 상품을 등록하세요"
            description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
            align="left"
          />
        </ContentSection>
        <Banner image={BottomBannerImage}>
          <div className="text-[32px] md:text-[40px] xl:text-[40px] font-bold flex items-center mb-8 break-keep text-center md:text-center xl:text-left w-[300px]">
            믿을 수 있는 판다마켓 중고 거래
          </div>
        </Banner>
      </div>
    </HydrationBoundary>
  );
}
