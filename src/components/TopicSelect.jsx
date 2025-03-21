import { Link } from "react-router-dom";

export default function TopicSelect({ page, setPage, setTopic }) {
  return (
    <nav id="select-topic">
      <h2>Select topic</h2>
      <div className="links">
        <Link
          to="/articles"
          onClick={() => {
            setTopic("");
            page !== 1 && setPage(1);
          }}
        >
          All topics
        </Link>{" "}
        |{" "}
        <Link
          to="/topics/coding"
          onClick={() => {
            setTopic("coding");
            page !== 1 && setPage(1);
          }}
        >
          Coding
        </Link>{" "}
        |{" "}
        <Link
          to="/topics/football"
          onClick={() => {
            setTopic("football");
            page !== 1 && setPage(1);
          }}
        >
          Football
        </Link>{" "}
        |{" "}
        <Link
          to="/topics/cooking"
          onClick={() => {
            setTopic("cooking");
            page !== 1 && setPage(1);
          }}
        >
          Cooking
        </Link>
      </div>
    </nav>
  );
}
