import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { getArticles } from "../api-requests";
import { useEffect, useState } from "react";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  const cards = articles.map((article) => {
    return (
      <Card key={article.article_id} className="cards">
        <Card.Img variant="top" src={article.article_img_url} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted : {article.created_at}</small>
        </Card.Footer>
      </Card>
    );
  });
  return <CardGroup id="card-group">{cards}</CardGroup>;
}
