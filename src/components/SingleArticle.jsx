import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  getArticleById,
  getComments,
  postComment,
  voteOnArticle,
} from "../api-requests";
import { UserContext } from "../App";

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
      <Comments article_id={article_id} />
    </>
  );
}

function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [posted, setPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [singleButtonId, setSingleButtonId] = useState("");

  // brings user in from app level for use in comment delete
  const user = useContext(UserContext);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [posted]);

  function handleDelete(e) {
    setIsLoading(true);
    // console.log(e.target.value, typeof e.target.value, "e.target.value");

    setSingleButtonId(e.target.value);

    const newComments = comments.filter(
      (comment) => comment.comment_id !== Number(e.target.value)
    );

    deleteComment(e.target.value).then(() => {
      setComments(newComments);
      // setSingleButtonId("");
      setIsLoading(false);
    });
  }

  // console.log(
  //   singleButtonId,
  //   typeof singleButtonId,
  //   "single button id after set"
  // );

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
        {!isLoading && (
          <button value={comment.comment_id} onClick={(e) => handleDelete(e)}>
            Delete
          </button>
        )}
        {isLoading && (
          <button
            id="deleting..."
            value={comment.comment_id}
            disabled
            style={{ backgroundColor: "grey" }}
          >
            Deleting...
          </button>
        )}
        <p> {comment.votes}</p>
      </div>
    );
  });

  return (
    <>
      <PostComment article_id={article_id} setPosted={setPosted} />
      <div className="comments-container">{mappedComments}</div>
    </>
  );
}

function PostComment({ article_id, setPosted }) {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    // hardcodes existing user for now
    const comment = { body, username: "tickle122" };
    setIsLoading(true);
    postComment(article_id, comment)
      .then(() => {
        setPosted(true);
        setBody("");
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <div className="post">
      <h3>Post a Comment</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-input">Comment:</label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          id="comment-input"
          required
        />
        {!isLoading && <button type="submit">Post comment</button>}
        {isLoading && (
          <button disabled style={{ backgroundColor: "grey" }}>
            Posting comment...
          </button>
        )}
      </form>
      {error && <ErrorComponent message={error.message} />}
    </div>
  );
}

const ErrorComponent = ({ message }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
};
