import { useState } from "react";
import Button from "./Button";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentInput.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(commentInput);
      setCommentInput("");
    } catch (err) {
      console.error("댓글 작성에 실패했습니다.", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        className="w-full p-4 bg-input-background border border-none rounded-lg mb-2 resize-none"
        rows={4}
        placeholder="댓글을 입력해주세요."
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          등록
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
