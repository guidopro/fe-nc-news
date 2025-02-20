import { Link } from "react-router-dom";

export default function TopicNotFound() {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>There are currently no topics about this</p>
      <Link to="/" reloadDocument>
        Return to homepage
      </Link>
    </div>
  );
}
