import { Link } from "react-router-dom";

export default function TopicSelect({}) {
  return (
    <nav id="select-topic">
      <h2>Select topic</h2>
      <div className="links">
        <Link to="/articles">All topics</Link> |{" "}
        <Link to="/topics/coding">Coding</Link> |{" "}
        <Link to="/topics/football">Football</Link> |{" "}
        <Link to="/topics/cooking">Cooking</Link>
      </div>
    </nav>
  );
}
