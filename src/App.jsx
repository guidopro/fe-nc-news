import { Routes, Route } from "react-router-dom";

// styling
import "./App.css";

// components
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import NotFound from "./components/error_handlers/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route index element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics/:topic" element={<ArticleList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
