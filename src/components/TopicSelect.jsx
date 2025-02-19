import { Link } from "react-router-dom";

export default function TopicSelect({ selectTopic }) {
  return (
    <nav>
      <h2>Select topic</h2>
      <div className="links">
        <Link
          to="/articles/"
          onClick={() => {
            selectTopic("");
          }}
        >
          All topics
        </Link>{" "}
        |{" "}
        <Link
          to="/articles/coding"
          onClick={() => {
            selectTopic("coding");
          }}
        >
          Coding
        </Link>{" "}
        |{" "}
        <Link
          to="/articles/football"
          onClick={() => {
            selectTopic("football");
          }}
        >
          Football
        </Link>{" "}
        |{" "}
        <Link
          to="/articles/cooking"
          onClick={() => {
            selectTopic("cooking");
          }}
        >
          Cooking
        </Link>
      </div>
    </nav>
  );
}
