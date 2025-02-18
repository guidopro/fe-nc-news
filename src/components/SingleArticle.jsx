import { useParams } from "react-router-dom";
import { getArticleById, getComments, voteOnArticle } from "../api-requests";
import { useEffect, useState } from "react";

export default function SingleArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id, likes]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  function handleLike(vote) {
    if (hasVoted) {
      return;
    }
    voteOnArticle(article_id, vote).catch((err) => {
      setError(err);
    });
    setLikes((currentCount) => currentCount + vote);
    setHasVoted(true);
  }

  return (
    <>
      <div id="single-article-container">
        <img src={article.article_img_url} alt="" />
        <h2>{article.title}</h2>
        <p>{article.topic}</p>
        <p>
          Written by {article.author} on {article.created_at}
        </p>
        <p>{article.body}</p>
        <button id="article like-button" onClick={() => handleLike(1)}>
          👍
        </button>
        <button id="article unlike-button" onClick={() => handleLike(-1)}>
          👎
        </button>
        <p>{article.votes + likes}</p>
        {error && <ErrorComponent message={error.message} />}
      </div>
      <PostComment />
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

const ErrorComponent = ({ message }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
};

function PostComment() {
  return (
    <form action="">
      <input type="text" />
      <button type="submit">✉️</button>
    </form>
  );
}
