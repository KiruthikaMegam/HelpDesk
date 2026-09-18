function PriorityBadge({ priority }) {
  return (
    <span
      className={`badge priority-${priority.toLowerCase()}`}
    >
      <span className="priority-dot" />

      {priority}
    </span>
  );
}

export default PriorityBadge;