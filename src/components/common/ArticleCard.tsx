import Image from "next/image";

export default function ArticleCard({
  content,
  nickname,
  createdAt,
  likeCount,
}: {
  content: string;
  nickname: string;
  createdAt: string;
  likeCount: number;
}) {
  return (
    <div className="w-full flex flex-col justify-between mt-4 px-6 py-4 h-[138px] relative bg-best-article-background rounded-lg">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-10 xl:gap-5">
          <div className="text-[18px] text-text-primary-black font-semibold">
            {content}
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
            <div>{nickname}</div>
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
          <div className="text-text-primary-gray">{createdAt}</div>
        </div>
      </div>
    </div>
  );
}
