export default function SortQueries({ setQuery }) {
  return (
    <div>
      <label htmlFor="sort_by">Sort by:</label>
      <select
        id="sort_by"
        defaultValue="created_at"
        onChange={(e) => setQuery(e.target.value)}
      >
        <option value="created_at">Newest</option>
        <option value="created_at&order=asc">Oldest</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>
    </div>
  );
}
