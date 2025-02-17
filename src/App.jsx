import { useState } from "react";
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
      <ArticleList />
    </>
  );
}

export default App;
