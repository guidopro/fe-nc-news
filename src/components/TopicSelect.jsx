import { Link } from "react-router-dom";

export default function TopicSelect({ setSelectTopic }) {
  return (
    <nav>
      <h2>Select topic</h2>
      <div className="links">
        <Link
          to="/articles"
          onClick={() => {
            setSelectTopic("");
          }}
        >
          All topics
        </Link>{" "}
        |{" "}
        <Link
          to="/articles?topic=coding"
          onClick={() => {
            setSelectTopic("coding");
          }}
        >
          Coding
        </Link>{" "}
        |{" "}
        <Link
          to="/articles?topic=football"
          onClick={() => {
            setSelectTopic("football");
          }}
        >
          Football
        </Link>{" "}
        |{" "}
        <Link
          to="/articles?topic=cooking"
          onClick={() => {
            setSelectTopic("cooking");
          }}
        >
          Cooking
        </Link>
      </div>
    </nav>
  );
}
