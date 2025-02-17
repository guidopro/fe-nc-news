import { useParams } from "react-router-dom";
import { getArticleById } from "../api-requests";
import { useEffect, useState } from "react";

export default function SingleArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div id="single-article-container">
      <img src={article.article_img_url} alt="" />
      <h2>{article.title}</h2>
      <p>{article.topic}</p>
      <p>
        Written by {article.author} on {article.created_at}
      </p>
      <p>{article.body}</p>
      <button>👍 {article.votes}</button>
    </div>
  );
}
