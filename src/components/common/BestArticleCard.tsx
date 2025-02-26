import Image from "next/image";
import { formatDate } from "@/utils/date";

interface BestArticleCardProps {
  title: string;
  createdAt: string;
  likeCount: number;
  onClick?: () => void;
}

export default function BestArticleCard({
  title,
  createdAt,
  likeCount,
  onClick,
}: BestArticleCardProps) {
  return (
    <div
      className="w-[343px] flex flex-col justify-between mt-4 px-6 pt-[46px] pb-4 h-[198px] relative xl:w-[384px] xl:h-[169px] bg-best-article-background rounded-lg shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <Image
        src="/images/best_badge.png"
        alt="best badge"
        width={102}
        height={30}
        className="absolute top-0 left-6"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-10 xl:gap-5">
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
            <div>총명한판다</div>
            <div className="flex items-center gap-1">
              <Image
                src="/icons/ic_heart.png"
                alt="like"
                width={14}
                height={14}
              />
              {likeCount}
            </div>
          </div>
          <div className="text-text-primary-gray">{formatDate(createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
