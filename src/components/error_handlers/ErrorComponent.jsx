export default function ErrorComponent({ message }) {
  return (
    <div className="error">
      <h4>Error</h4>
      <p>{message}</p>
    </div>
  );
}
