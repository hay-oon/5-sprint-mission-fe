import { useState } from "react";
import Image from "next/image";
import { Comment, updateComment, deleteComment } from "@/api/articles";
import { formatRelativeTime } from "@/utils/date";
import ContextMenu from "./ContextMenu";

interface CommentItemProps {
  comment: Comment;
  articleId: string;
  onCommentUpdated: () => void;
}

const CommentItem = ({
  comment,
  articleId,
  onCommentUpdated,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMenuSelect = async (value: string) => {
    if (value === "edit") {
      setIsEditing(true);
      setEditContent(comment.content);
    } else if (value === "delete") {
      if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
        try {
          await deleteComment(comment.id);
          alert("댓글이 삭제되었습니다.");
          onCommentUpdated();
        } catch (err) {
          console.error("댓글 삭제에 실패했습니다.", err);
          alert("댓글 삭제에 실패했습니다.");
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateComment(comment.id, editContent);
      setIsEditing(false);
      onCommentUpdated();
    } catch (err) {
      console.error("댓글 수정에 실패했습니다.", err);
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <Image src="/icons/Avatar.png" alt="profile" width={24} height={24} />
          <span className="ml-2 text-sm text-gray-600">총명한판다</span>
        </div>
        <span className="mx-2 text-gray-400">·</span>
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

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            disabled={isSubmitting}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-primary-blue text-white rounded-md"
              disabled={isSubmitting}
            >
              수정
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-800">{comment.content}</p>
      )}
    </div>
  );
};

export default CommentItem;
