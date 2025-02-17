import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://guys-app.onrender.com/api",
  timeout: 1000,
});

export const getUsers = () => {
  return apiClient.get("/users").then(({ data }) => {
    return data.users;
  });
};
export const getArticles = () => {
  return apiClient.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
