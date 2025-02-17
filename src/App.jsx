import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Header />
      <NavBar setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<ArticleList />}></Route>
      </Routes>
    </>
  );
}

export default App;
