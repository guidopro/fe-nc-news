import { useParams } from "react-router-dom";

export default function SingleArticle() {
  const { article_id } = useParams();

  return (
    <>
      <p>Single Article page {article_id}</p>
    </>
  );
}
