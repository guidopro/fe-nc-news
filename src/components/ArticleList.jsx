import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import { getArticles } from "../api-requests";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopicSelect from "./TopicSelect";
import SortQueries from "./SortQueries";

export default function ArticleList() {
  const { topic } = useParams();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectTopic, setSelectTopic] = useState("");
  const [query, setQuery] = useState(undefined);

  useEffect(() => {
    getArticles(topic, query).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [selectTopic, query]);

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
      <SortQueries setQuery={setQuery} />
      <CardGroup id="card-group">{cards}</CardGroup>
    </>
  );
}
