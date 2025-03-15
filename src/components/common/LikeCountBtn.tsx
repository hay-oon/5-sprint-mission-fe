import Image from "next/image";

interface LikeCountBtnProps {
  favoriteCount: number;
  onLikeClick: () => void;
  isFavorite: boolean;
}

const LikeCountBtn = ({
  favoriteCount,
  onLikeClick,
  isFavorite,
}: LikeCountBtnProps) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-3xl px-3 py-1">
      <button className="flex items-center text-gray-500" onClick={onLikeClick}>
        <Image
          src={
            isFavorite ? "/icons/ic_heart_colored.png" : "/icons/ic_heart.png"
          }
          alt="like"
          width={24}
          height={24}
        />
        <span className="ml-1">{favoriteCount}</span>
      </button>
    </div>
  );
};

export default LikeCountBtn;
