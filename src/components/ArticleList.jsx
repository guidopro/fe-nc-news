import { getArticles } from "../api-requests";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// components
import TopicSelect from "./TopicSelect";
import SortQueries from "./SortQueries";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import TopicNotFound from "./error_handlers/TopicNotFound";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [query, setQuery] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const params = useParams();
  const topic = params.topic;

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
    getArticles(topic, query, order)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, query, order]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  } else if (isError) {
    return <TopicNotFound />;
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
      <TopicSelect />
      <SortQueries queryHandler={queryHandler} query={query} />
      <CardGroup id="card-group">{cards}</CardGroup>
    </>
  );
}

