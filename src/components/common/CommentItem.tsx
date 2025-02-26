import { Comment } from "@/api/articles";
import { formatRelativeTime } from "@/utils/date";
import Image from "next/image";
import ContextMenu from "./ContextMenu";

interface CommentItemProps {
  comment: Comment;
  onEdit?: (commentId: number) => void;
  onDelete?: (commentId: number) => void;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
  const handleMenuSelect = (action: string) => {
    if (action === "edit" && onEdit) {
      onEdit(Number(comment.id));
    } else if (action === "delete" && onDelete) {
      onDelete(Number(comment.id));
    }
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center mb-2">
        <div>
          <Image src="/icons/Avatar.png" alt="profile" width={32} height={32} />
        </div>
        <span className="ml-2 text-sm text-gray-600">똑똑한판다</span>
        <span className="mx-2 text-gray-400 text-sm">·</span>
        <span className="text-sm text-gray-400">
          {formatRelativeTime(comment.createdAt)}
        </span>
        <div className="ml-auto">
          <ContextMenu
            options={[
              { value: "edit", label: "수정하기" },
              { value: "delete", label: "삭제하기" },
            ]}
            onSelect={handleMenuSelect}
            trigger={
              <Image
                src="/icons/ic_kebab.png"
                alt="edit-delete"
                width={24}
                height={24}
              />
            }
          />
        </div>
      </div>
      <p className="text-gray-800">{comment.content}</p>
    </div>
  );
};

export default CommentItem;
