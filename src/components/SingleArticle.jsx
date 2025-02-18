import { useParams } from "react-router-dom";
import { getArticleById, getComments, voteOnArticle } from "../api-requests";
import { useEffect, useState } from "react";

export default function SingleArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  function handleLike(e) {
    voteOnArticle(article_id);
  }

  return (
    <>
      <div id="single-article-container">
        <img src={article.article_img_url} alt="" width="200px" />
        <h2>{article.title}</h2>
        <p>{article.topic}</p>
        <p>
          Written by {article.author} on {article.created_at}
        </p>
        <p>{article.body}</p>
        <button id="article like-button" onClick={() => handleLike()}>
          👍
        </button>
        <button id="article unlike-button">👎</button>
        <p>{article.votes + likes}</p>
      </div>
      <Comments article_id={article_id} />
    </>
  );
}

function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState();

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, []);

  const mappedComments = comments.map((comment) => {
    return (
      <div
        key={comment.comment_id}
        style={{ border: "solid 1px black", margin: "1rem", padding: "1rem" }}
      >
        <p>
          {comment.author} {comment.created_at}
        </p>
        <p>{comment.body}</p>
        <button id="like-button">👍 </button>
        <button id="unlike-button">👎</button>
        <p> {comment.votes}</p>
      </div>
    );
  });

  return <div className="comments-container">{mappedComments}</div>;
}
