import { getArticles } from "../api-requests";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// bootstrap

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// components

import TopicSelect from "./TopicSelect";
import SortQueries from "./SortQueries";
import TopicNotFound from "./error_handlers/TopicNotFound";
import Spinner from "./Loading";
import { postedAt } from "../utils";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [query, setQuery] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const params = useParams();
  const topic = params.topic;

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
    return <Spinner />;
  } else if (isError) {
    return <TopicNotFound />;
  }

  function queryHandler(e) {
    const splitQueries = e.target.value.split(" ");
    setQuery(splitQueries[0]);
    setOrder(splitQueries[1]);
  }

  function GridExample() {
    return (
      <Row xs={1} md={2} lg={3} className="g-4">
        {articles.map((article) => (
          <Col key={article.article_id}>
            <Card>
              <Card.Img variant="top" src={article.article_img_url} />
              <Card.Body>
                <Card.Text>
                  <small>{article.topic}</small>
                </Card.Text>
                <Link to={`/articles/${article.article_id}`}>
                  <Card.Title>{article.title}</Card.Title>
                </Link>
                <Card.Text>By: {article.author}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  {postedAt(article.created_at)}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <TopicSelect />
      <SortQueries queryHandler={queryHandler} query={query} order={order} />
      <GridExample />
    </>
  );
}
