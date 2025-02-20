import { Link } from "react-router-dom";

export default function ArticleNotFound() {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>This article cannnot be found</p>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}
