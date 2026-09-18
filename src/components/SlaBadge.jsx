function SlaBadge({ dueDate, status }) {
  if (status === "Resolved" || status === "Closed") {
    return (
      <span className="sla-badge sla-complete">
        SLA Met
      </span>
    );
  }

  const due = new Date(dueDate);

  const now = new Date();

  const difference = due.getTime() - now.getTime();

  if (difference <= 0) {
    return (
      <span className="sla-badge sla-breached">
        Breached
      </span>
    );
  }

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  if (hours < 3) {
    return (
      <span className="sla-badge sla-warning">
        {hours}h {minutes}m
      </span>
    );
  }

  return (
    <span className="sla-badge sla-safe">
      {hours}h left
    </span>
  );
}

export default SlaBadge;