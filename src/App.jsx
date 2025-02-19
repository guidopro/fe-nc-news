import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

// styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("grumpy19");
  return (
    <>
      <UserContext.Provider value={user}>
        <Header />
        <NavBar />
        <Routes>
          <Route index element={<ArticleList />}></Route>
          <Route
            path="/articles/:article_id"
            element={<SingleArticle />}
          ></Route>
        </Routes>
      </UserContext.Provider>
      ;
    </>
  );
}

export default App;
