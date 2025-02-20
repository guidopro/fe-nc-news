import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>This page cannnot be found</p>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}
