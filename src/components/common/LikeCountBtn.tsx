import Image from "next/image";

interface LikeCountBtnProps {
  favoriteCount: number;
}

const LikeCountBtn = ({ favoriteCount }: LikeCountBtnProps) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-3xl px-3 py-1">
      <button className="flex items-center text-gray-500">
        <Image src="/icons/ic_heart.png" alt="like" width={24} height={24} />
        <span className="ml-1">{favoriteCount}</span>
      </button>
    </div>
  );
};

export default LikeCountBtn;
