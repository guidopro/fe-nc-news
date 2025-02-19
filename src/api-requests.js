import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://guys-app.onrender.com/api",
  // timeout: 1000,
});

export const getUsers = () => {
  return apiClient.get("/users").then(({ data }) => {
    return data.users;
  });
};
export const getArticles = (topic) => {
  return apiClient.get("/articles", { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return apiClient.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getComments = (article_id) => {
  return apiClient.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const voteOnArticle = (article_id, vote) => {
  return apiClient
    .patch(`/articles/${article_id}/`, { inc_votes: vote })
    .then(({ data }) => {
      return data.updatedArticle;
    });
};

export const postComment = (article_id, comment) => {
  return apiClient
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => {
      return data.postedComment;
    });
};

export const deleteComment = (comment_id) => {
  return apiClient.delete(`/comments/${comment_id}`);
};
