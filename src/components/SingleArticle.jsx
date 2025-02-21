import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";
import {
  deleteComment,
  getArticleById,
  getComments,
  postComment,
  voteOnArticle,
} from "../api-requests";

import ArticleNotFound from "./error_handlers/ArticleNotFound";
import ErrorComponent from "./error_handlers/ErrorComponent";

export default function SingleArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((error) => {
        setIsError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  } else if (isError) {
    return <ArticleNotFound />;
  }

  function handleLike(vote) {
    if (hasVoted) {
      return;
    }
    voteOnArticle(article_id, vote).catch((err) => {
      setIsError(err);
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
          👍 {article.votes + likes}
        </button>
        <button id="article unlike-button" onClick={() => handleLike(-1)}>
          👎
        </button>
        {isError && <ErrorComponent message={error.message} />}
      </div>
      <Comments article_id={article_id} />
    </>
  );
}

function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingButton, setDeletingButton] = useState("");
  const [newPost, setNewPost] = useState(false);

  // brings user in from app level for use in comment delete
  const { user } = useContext(UserContext);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [deletingButton, user, newPost]);

  function handleDelete(e) {
    setIsLoading(true);
    setDeletingButton(e.target.value);

    const newComments = comments.filter(
      (comment) => comment.comment_id !== Number(e.target.value)
    );

    deleteComment(e.target.value).then(() => {
      setComments(newComments);
      setDeletingButton("");
      setIsLoading(false);
    });
  }

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
        <button id="like-button">👍 {comment.votes}</button>
        <button id="unlike-button">👎</button>
        {!isLoading && user === comment.author && (
          <button value={comment.comment_id} onClick={(e) => handleDelete(e)}>
            Delete
          </button>
        )}
        {isLoading && deletingButton === comment.comment_id && (
          <button id="deleting..." disabled style={{ backgroundColor: "grey" }}>
            Deleting...
          </button>
        )}
      </div>
    );
  });

  return (
    <>
      <PostComment
        article_id={article_id}
        setComments={setComments}
        newPost={newPost}
        setNewPost={setNewPost}
      />
      <div className="comments-container">{mappedComments}</div>
    </>
  );
}

function PostComment({ article_id, setComments, newPost, setNewPost }) {
  const { user } = useContext(UserContext);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useState(() => {
    setIsError(null);
  }, [user]);

  // console.log(user, isError);

  function handleSubmit(e) {
    e.preventDefault();

    // prevents non-users from posting
    if (!user) {
      setIsError({ message: "Please log in to post a comment, thank you!" });
      return;
    }

    const comment = { body, username: user };
    setIsLoading(true);
    postComment(article_id, comment)
      .then((postedComm) => {
        setNewPost((newPost = newPost ? false : true));
        // setComments((currComms) => {
        //   return [...currComms, postedComm];
        // });
        setBody("");
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
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
      {isError && <ErrorComponent message={isError.message} />}
    </div>
  );
}
