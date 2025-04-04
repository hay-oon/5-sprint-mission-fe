import Image from "next/image";
import avatar from "@public/icons/Avatar.png";
import { formatDate } from "@/utils/date";

interface ArticleCardProps {
  title: string;
  createdAt: string;
  favoriteCount: number;
  nickname: string;
  onClick?: () => void;
}

export default function ArticleCard({
  title,
  createdAt,
  favoriteCount,
  nickname,
  onClick,
}: ArticleCardProps) {
  return (
    <div
      className="w-full flex flex-col justify-between mt-4 px-6 py-4 h-[138px] relative bg-best-article-background rounded-lg shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between gap-10 xl:gap-5">
          <div className="text-[18px] text-text-primary-black font-semibold">
            {title}
          </div>
          <Image
            src="/images/img_article_w_frame.png"
            alt="article"
            width={72}
            height={72}
          />
        </div>
        <div className="flex justify-between gap-2 text-[14px]">
          <div className="text-text-primary-charcoal flex items-center gap-2">
            <Image src={avatar} alt="avatar" width={24} height={24} />
            <div>{nickname}</div>
            <div className="text-text-primary-gray">
              {formatDate(createdAt)}
            </div>
          </div>
          <div className="flex items-center gap-1 text-text-primary-gray">
            <Image
              src="/icons/ic_heart.png"
              alt="like"
              width={14}
              height={14}
            />
            {favoriteCount}
          </div>
        </div>
      </div>
    </div>
  );
}
