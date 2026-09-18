import "./StatCard.css";

function StatCard({
  title,
  value,
  icon,
  subtitle,
  variant = "purple",
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-${variant}`}>
        {icon}
      </div>

      <div className="stat-content">
        <span className="stat-title">{title}</span>

        <strong>{value}</strong>

        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;