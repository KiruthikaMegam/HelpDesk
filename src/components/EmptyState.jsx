import "./EmptyState.css";

function EmptyState({
  title = "Nothing found",
  description = "No records match your search.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">⌕</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default EmptyState;