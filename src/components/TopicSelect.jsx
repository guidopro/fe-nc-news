import { Link } from "react-router-dom";

export default function TopicSelect() {
  return (
    <nav>
      <Link to="/articles/alltopics">All topics</Link> |{" "}
      <Link to="/articles/coding">Coding</Link> |{" "}
      <Link to="/articles/football">Football</Link> |{" "}
      <Link to="/articles/cooking">Cooking</Link>
    </nav>
  );
}
