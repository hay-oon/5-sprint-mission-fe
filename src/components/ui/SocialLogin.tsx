import Image from "next/image";
import Link from "next/link";

function SocialLogin() {
  return (
    <div className="flex justify-between rounded-[8px] bg-[#E6F2FF] py-4 px-6">
      <div className="flex items-center text-[16px] text-text-primary-black">
        간편 로그인하기
      </div>
      <div className="flex gap-4">
        <div>
          <Link href="https://www.google.com">
            <button>
              <Image
                src="/images/social/google-logo.png"
                alt="Google"
                width={42}
                height={42}
              />
            </button>
          </Link>
        </div>
        <div>
          <Link href="https://www.kakaocorp.com/page">
            <button>
              <Image
                src="/images/social/kakao-logo.png"
                alt="Kakao"
                width={42}
                height={42}
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SocialLogin;
