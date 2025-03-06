import Image from "next/image";
import Link from "next/link";
import instagramLogo from "@public/images/social/instagram-logo.svg";
import facebookLogo from "@public/images/social/facebook-logo.svg";
import twitterLogo from "@public/images/social/twitter-logo.svg";
import youtubeLogo from "@public/images/social/youtube-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#111827] w-full h-[160px] flex justify-center items-start">
      <div className="w-full xl:max-w-[1120px] mx-4 md:mx-6 xl:mx-5 mt-8 mb-0 font-normal flex justify-between items-center flex-wrap">
        <div className="text-[#E5E7EB]">@codeit-2024</div>
        <div className="gap-[30px] flex text-[#E5E7EB]">
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
        <div className="flex gap-[13px]">
          <Link href="https://www.facebook.com">
            <Image
              src={facebookLogo}
              alt="facebook 로고"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://www.x.com">
            <Image
              src={twitterLogo}
              alt="X(구 트위터) 로고"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://www.youtube.com">
            <Image
              src={youtubeLogo}
              alt="youtube 로고"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://www.instagram.com">
            <Image
              src={instagramLogo}
              alt="instagram 로고"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
