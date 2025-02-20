import { getArticles } from "../api-requests";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// components
import TopicSelect from "./TopicSelect";
import SortQueries from "./SortQueries";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectTopic, setSelectTopic] = useState("");
  const [query, setQuery] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const params = useParams();
  console.log(params);

  function queryHandler(e) {
    if (e.target.value === "created_at asc") {
      const splitQueries = e.target.value.split(" ");
      setQuery(splitQueries[0]);
      // changes order to asc
      setOrder(splitQueries[1]);
    } else {
      setQuery(e.target.value);
      setOrder("desc");
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getArticles(selectTopic, query, order).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [selectTopic, query, order]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  const cards = articles.map((article) => {
    const url = `/articles/${article.article_id}`;
    return (
      <Card key={article.article_id} className="cards">
        <Card.Img variant="top" src={article.article_img_url} />
        <Card.Body>
          <Link to={url}>
            <Card.Title>{article.title}</Card.Title>
          </Link>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted : {article.created_at}</small>
        </Card.Footer>
      </Card>
    );
  });
  return (
    <>
      <TopicSelect setSelectTopic={setSelectTopic} />
      <SortQueries queryHandler={queryHandler} />
      <CardGroup id="card-group">{cards}</CardGroup>
    </>
  );
}
