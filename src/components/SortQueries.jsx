export default function SortQueries({ queryHandler }) {
  return (
    <div>
      <label htmlFor="sort_by">Sort by:</label>
      <select
        id="sort_by"
        defaultValue="created_at"
        onChange={(e) => queryHandler(e)}
      >
        <option value="created_at">Newest</option>
        <option value="created_at">Oldest</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>
    </div>
  );
}
