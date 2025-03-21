export default function NextBackButtons({ page, setPage, totalCount, limit }) {
  const pages = Math.ceil(totalCount / limit);

  let buttons = [];

  for (let i = 0; i < pages; i++) {
    if (i === 0) {
      buttons.push(
        <button
          key={i}
          className={page === i + 1 && "button--clicked"}
          onClick={() => setPage(i + 1)}
          color="black"
        >
          {i + 1}
        </button>
      );
    } else
      buttons.push(
        <button
          key={i}
          className={page === i + 1 && "button--clicked"}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      );
  }

  return (
    <div id="topic-buttons">
      <button
        onClick={() => setPage((currentPage) => currentPage - 1)}
        disabled={page === 1}
      >
        Back
      </button>
      {buttons}
      <button
        onClick={() => setPage((currentPage) => currentPage + 1)}
        disabled={limit * page >= totalCount}
      >
        Next
      </button>
    </div>
  );
}
