export default function SortQueries() {
  return (
    <div>
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" defaultValue="newest">
        <option value="newest">By newest</option>
        <option value="oldest">By oldest</option>
        <option>By votes</option>
        <option>By comment count</option>
      </select>
    </div>
  );
}
