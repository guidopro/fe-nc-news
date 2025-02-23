export default function SortQueries({ queryHandler, query, order }) {
  return (
    <div>
      <label htmlFor="sort_by">Sort by:</label>
      <select
        id="sort_by"
        defaultValue={query + " " + order}
        onChange={(e) => queryHandler(e)}
      >
        <option value="created_at desc">Newest</option>
        <option value="created_at asc">Oldest</option>
        <option value="votes desc">Votes (most)</option>
        <option value="comment_count desc">Comments (most)</option>
      </select>
    </div>
  );
}
