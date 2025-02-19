import { Link } from "react-router-dom";

export default function TopicSelect({ setSelectTopic }) {
  return (
    <nav>
      <h2>Select topic</h2>
      <div className="links">
        <Link
          to="/"
          onClick={() => {
            setSelectTopic("");
          }}
        >
          All topics
        </Link>{" "}
        |{" "}
        <Link
          to="/coding"
          onClick={() => {
            setSelectTopic("coding");
          }}
        >
          Coding
        </Link>{" "}
        |{" "}
        <Link
          to="/football"
          onClick={() => {
            setSelectTopic("football");
          }}
        >
          Football
        </Link>{" "}
        |{" "}
        <Link
          to="/cooking"
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
