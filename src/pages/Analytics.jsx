import { useHelpdesk } from "../context/HelpdeskContext";

import StatCard from "../components/StatCard";

import "./Analytics.css";

function Analytics() {
  const { tickets, categories } = useHelpdesk();

  const resolved = tickets.filter(
    (ticket) =>
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
  ).length;

  const resolutionRate =
    tickets.length === 0
      ? 0
      : Math.round(
          (resolved / tickets.length) * 100
        );

  const categoryData = categories.map(
    (category) => ({
      category,
      count: tickets.filter(
        (ticket) =>
          ticket.category === category
      ).length,
    })
  );

  const maxCategory = Math.max(
    ...categoryData.map((item) => item.count),
    1
  );

  const priorityData = [
    {
      name: "Critical",
      count: tickets.filter(
        (item) => item.priority === "Critical"
      ).length,
    },
    {
      name: "High",
      count: tickets.filter(
        (item) => item.priority === "High"
      ).length,
    },
    {
      name: "Medium",
      count: tickets.filter(
        (item) => item.priority === "Medium"
      ).length,
    },
    {
      name: "Low",
      count: tickets.filter(
        (item) => item.priority === "Low"
      ).length,
    },
  ];

  return (
    <div className="analytics-page page-animation">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            REPORTING
          </span>

          <h1>Support Analytics</h1>

          <p>
            Track service efficiency, ticket volume
            and resolution performance.
          </p>
        </div>
      </div>

      <div className="analytics-stat-grid">
        <StatCard
          title="Total Tickets"
          value={tickets.length}
          icon="▤"
          subtitle="Across all categories"
          variant="purple"
        />

        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          icon="✓"
          subtitle="Resolved successfully"
          variant="green"
        />

        <StatCard
          title="Average Response"
          value="18m"
          icon="◴"
          subtitle="First response time"
          variant="blue"
        />

        <StatCard
          title="Customer Rating"
          value="4.8"
          icon="★"
          subtitle="Average satisfaction"
          variant="orange"
        />
      </div>

      <div className="analytics-grid">
        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h3>Tickets by Category</h3>

              <p>
                Distribution of incoming support
                issues
              </p>
            </div>
          </div>

          <div className="horizontal-chart">
            {categoryData.map((item) => (
              <div
                className="horizontal-chart-row"
                key={item.category}
              >
                <div className="horizontal-chart-label">
                  <span>{item.category}</span>

                  <strong>{item.count}</strong>
                </div>

                <div className="horizontal-chart-track">
                  <div
                    className="horizontal-chart-bar"
                    style={{
                      width: `${
                        (item.count /
                          maxCategory) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h3>Priority Breakdown</h3>

              <p>
                Current urgency distribution
              </p>
            </div>
          </div>

          <div className="priority-analytics">
            {priorityData.map(
              (item, index) => {
                const percentage =
                  tickets.length === 0
                    ? 0
                    : Math.round(
                        (item.count /
                          tickets.length) *
                          100
                      );

                return (
                  <div
                    className="priority-analytics-row"
                    key={item.name}
                  >
                    <div
                      className={`priority-analysis-icon priority-analysis-${
                        index + 1
                      }`}
                    >
                      {item.name[0]}
                    </div>

                    <div className="priority-analysis-content">
                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {item.count} tickets
                        </span>
                      </div>

                      <div className="priority-analysis-progress">
                        <div
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    <strong className="priority-percentage">
                      {percentage}%
                    </strong>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>

      <section className="analytics-panel analytics-trend-panel">
        <div className="analytics-panel-heading">
          <div>
            <h3>Weekly Ticket Activity</h3>

            <p>
              Example support volume visualization
            </p>
          </div>
        </div>

        <div className="trend-chart">
          {[
            ["Mon", 45],
            ["Tue", 68],
            ["Wed", 52],
            ["Thu", 78],
            ["Fri", 91],
            ["Sat", 60],
            ["Sun", 38],
          ].map(([day, value]) => (
            <div
              className="trend-column"
              key={day}
            >
              <span className="trend-value">
                {value}
              </span>

              <div className="trend-column-track">
                <div
                  style={{
                    height: `${value}%`,
                  }}
                />
              </div>

              <strong>{day}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Analytics;