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
import { postedAt, capitalise } from "../utils";
import NextBackButtons from "./NextBackButtons";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [query, setQuery] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, query, order, page)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotalCount(total_count);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, query, order, page]);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <TopicNotFound />;
  }

  function queryHandler(e) {
    page !== 1 && setPage(1);
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
              <Link to={`/articles/${article.article_id}`}>
                <Card.Img variant="top" src={article.article_img_url} />
              </Link>
              <Card.Body>
                <Card.Text>
                  <small>{capitalise(article.topic)}</small>
                </Card.Text>
                <Link to={`/articles/${article.article_id}`}>
                  <Card.Title>{article.title}</Card.Title>
                </Link>
                <Card.Text>By: {article.author}</Card.Text>
                <Card.Text
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <p>Likes: {article.votes}</p>{" "}
                  <p>Comments: {article.comment_count}</p>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Posted on {postedAt(article.created_at)}
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
      <TopicSelect page={page} setPage={setPage} setTopic={setTopic} />
      <SortQueries queryHandler={queryHandler} query={query} order={order} />
      <NextBackButtons
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        limit={limit}
      />
      <GridExample />
    </>
  );
}
