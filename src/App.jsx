import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Header />
      <NavBar setLoggedIn={setLoggedIn} />
      <Routes>
        <Route index element={<ArticleList />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
      </Routes>
    </>
  );
}

export default App;
