import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";
import {
  deleteComment,
  getArticleById,
  getComments,
  postComment,
  voteOnArticle,
  voteOnComment,
} from "../api-requests";

import thumbsUp from "../assets/like.png";
import thumbsDown from "../assets/dislike.png";

import ArticleNotFound from "./error_handlers/ArticleNotFound";
import ErrorComponent from "./error_handlers/ErrorComponent";
import Spinner from "./Loading";
import { postedAt, capitalise } from "../utils";

export default function SingleArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

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
    return <Spinner />;
  } else if (isError) {
    return <ArticleNotFound />;
  }

  function handleLike(vote) {
    if (!article.liked) {
      setArticle({
        ...article,
        votes: article.votes + vote,
        liked: true,
        disliked: false,
      });
      voteOnArticle(article_id, vote).catch((err) => {
        setIsError(err);
      });
    }
  }

  function handleDislike(vote) {
    if (!article.disliked) {
      setArticle({
        ...article,
        votes: article.votes + vote,
        liked: false,
        disliked: true,
      });
      voteOnArticle(article_id, vote).catch((err) => {
        setIsError(err);
      });
    }
  }

  return (
    <>
      <div id="single-article-container">
        <img src={article.article_img_url} alt="" />
        <h2>{article.title}</h2>
        <p>{capitalise(article.topic)}</p>
        <p>
          Written by {article.author} on {postedAt(article.created_at)}
        </p>
        <p>{article.body}</p>
        <button
          className={article.liked ? "like-button--clicked" : "like-button"}
          onClick={() => handleLike(1)}
        >
          <img src={thumbsUp} style={{ height: "16px", width: "16px" }} />{" "}
          {article.votes}
        </button>
        <button
          className={article.disliked ? "like-button--clicked" : "like-button"}
          onClick={() => handleDislike(-1)}
        >
          <img src={thumbsDown} />
        </button>
        <div> {article.comment_count} Comments</div>

        {isError && <ErrorComponent message={error.message} />}
      </div>
      <CommentSection article_id={article_id} />
    </>
  );
}

function CommentSection({ article_id }) {
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
  }, [user, newPost]);

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

  function handleLike(comment_id, vote) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.comment_id === comment_id && !comment.liked) {
          // If the comment is not already liked
          return {
            ...comment,
            votes: comment.votes + vote,
            liked: true,
            disliked: false,
          };
        }
        return comment;
      })
    );
    voteOnComment(comment_id, vote).catch((err) => {
      setIsError(err);
    });
  }

  function handleDislike(comment_id, vote) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.comment_id === comment_id && !comment.disliked) {
          // If the comment is not already disliked
          return {
            ...comment,
            votes: comment.votes + vote,
            disliked: true,
            liked: false,
          };
        }
        return comment;
      })
    );
    voteOnComment(comment_id, vote).catch((err) => {
      setIsError(err);
    });
  }

  const mappedComments = comments.map((comment) => {
    return (
      <div className="comments" key={comment.comment_id}>
        <p>{comment.author}</p>
        <p>{postedAt(comment.created_at)}</p>
        <p>{comment.body}</p>
        <button
          className={comment.liked ? "like-button--clicked" : "like-button"}
          onClick={() => handleLike(comment.comment_id, 1)}
        >
          <img src={thumbsUp} alt="thumbs-up" /> {comment.votes}
        </button>
        <button
          className={comment.disliked ? "like-button--clicked" : "like-button"}
          onClick={() => handleDislike(comment.comment_id, -1)}
        >
          <img src={thumbsDown} alt="thumbs-down" />
        </button>
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
