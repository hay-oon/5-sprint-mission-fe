import { useParams } from "next/navigation";

function ArticleDetailPage() {
  const { id } = useParams();
  return <div>ArticleDetailPage{id} </div>;
}

export default ArticleDetailPage;
