import { Routes, Route } from "react-router-dom";

// styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route index element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      ;
    </>
  );
}

export default App;
