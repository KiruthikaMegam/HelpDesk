import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useHelpdesk } from "../context/HelpdeskContext";

import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import Loading from "../components/Loading";

import "./Dashboard.css";

function Dashboard() {
  const { tickets, agents } = useHelpdesk();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) =>
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
  ).length;

  const criticalTickets = tickets.filter(
    (ticket) => ticket.priority === "Critical"
  ).length;

  const statusData = [
    {
      label: "Open",
      value: openTickets,
      className: "chart-purple",
    },
    {
      label: "In Progress",
      value: progressTickets,
      className: "chart-blue",
    },
    {
      label: "Pending",
      value: tickets.filter(
        (ticket) => ticket.status === "Pending"
      ).length,
      className: "chart-orange",
    },
    {
      label: "Resolved",
      value: resolvedTickets,
      className: "chart-green",
    },
  ];

  const maxValue = Math.max(
    ...statusData.map((item) => item.value),
    1
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-page page-animation">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            OVERVIEW
          </span>

          <h1>Support Dashboard</h1>

          <p>
            Monitor support performance, SLA health and
            incoming tickets.
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="primary-button"
        >
          + Create Ticket
        </Link>
      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-stats">

        <StatCard
          title="Open Tickets"
          value={openTickets}
          icon="▤"
          subtitle="Awaiting support action"
          variant="purple"
        />

        <StatCard
          title="In Progress"
          value={progressTickets}
          icon="◴"
          subtitle="Currently being handled"
          variant="blue"
        />

        <StatCard
          title="Resolved"
          value={resolvedTickets}
          icon="✓"
          subtitle="Resolved or closed"
          variant="green"
        />

        <StatCard
          title="Critical"
          value={criticalTickets}
          icon="!"
          subtitle="Requires immediate action"
          variant="orange"
        />

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="dashboard-grid">

        {/* TICKET OVERVIEW */}

        <section className="dashboard-panel ticket-volume-panel">

          <div className="panel-heading">

            <div>
              <h3>Ticket Overview</h3>

              <p>
                Tickets grouped by current status
              </p>
            </div>

            <span className="panel-chip">
              This Week
            </span>

          </div>


          <div className="dashboard-chart">

            {statusData.map((item) => (

              <div
                className="dashboard-chart-column"
                key={item.label}
              >

                <div className="chart-number">
                  {item.value}
                </div>

                <div className="chart-track">

                  <div
                    className={`chart-fill ${item.className}`}
                    style={{
                      height: `${
                        (item.value / maxValue) * 100
                      }%`,
                    }}
                  />

                </div>

                <span>
                  {item.label}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* SLA HEALTH */}

        <section className="dashboard-panel sla-health-panel">

          <div className="panel-heading">

            <div>
              <h3>SLA Health</h3>

              <p>
                Current SLA performance
              </p>
            </div>

          </div>


          <div className="sla-score">

            <div className="sla-ring">

              <div className="sla-ring-inner">

                <strong>
                  92%
                </strong>

                <span>
                  SLA Met
                </span>

              </div>

            </div>

          </div>


          <div className="sla-summary">

            <div>

              <span className="sla-dot sla-dot-safe" />

              Within SLA

              <strong>
                {
                  tickets.filter(
                    (ticket) =>
                      ticket.slaDue &&
                      (
                        new Date(ticket.slaDue) >
                          new Date() ||
                        ticket.status === "Resolved" ||
                        ticket.status === "Closed"
                      )
                  ).length
                }
              </strong>

            </div>


            <div>

              <span className="sla-dot sla-dot-danger" />

              Breached

              <strong>
                {
                  tickets.filter(
                    (ticket) =>
                      ticket.slaDue &&
                      new Date(ticket.slaDue) <
                        new Date() &&
                      ticket.status !== "Resolved" &&
                      ticket.status !== "Closed"
                  ).length
                }
              </strong>

            </div>

          </div>

        </section>

      </div>


      {/* =========================
          LOWER GRID
      ========================= */}

      <div className="dashboard-lower-grid">


        {/* =========================
            RECENT TICKETS
        ========================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h3>
                Recent Tickets
              </h3>

              <p>
                Latest customer requests
              </p>
            </div>

            <Link
              to="/tickets"
              className="panel-link"
            >
              View all
            </Link>

          </div>


          <div className="dashboard-ticket-list">

            {tickets
              .slice(0, 5)
              .map((ticket) => {

                /*
                  SAFE CUSTOMER VALUE

                  If customer is missing,
                  use "Unknown Customer"
                */

                const customer =
                  ticket.customer ||
                  "Unknown Customer";


                /*
                  CREATE CUSTOMER INITIALS
                */

                const customerInitials =
                  customer
                    .split(" ")
                    .filter(Boolean)
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2);


                return (

                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="dashboard-ticket-row"
                    key={ticket.id}
                  >

                    <div className="dashboard-ticket-customer">

                      <div className="customer-avatar">
                        {customerInitials || "UC"}
                      </div>


                      <div>

                        <strong>
                          {ticket.subject ||
                            "Untitled Ticket"}
                        </strong>

                        <span>
                          #{ticket.id || "N/A"} • {customer}
                        </span>

                      </div>

                    </div>


                    <PriorityBadge
                      priority={
                        ticket.priority ||
                        "Low"
                      }
                    />


                    <StatusBadge
                      status={
                        ticket.status ||
                        "Open"
                      }
                    />

                  </Link>

                );
              })}

          </div>

        </section>


        {/* =========================
            SUPPORT TEAM
        ========================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>

              <h3>
                Support Team
              </h3>

              <p>
                Agent workload
              </p>

            </div>

          </div>


          <div className="agent-list">

            {agents
              .filter(
                (agent) =>
                  agent &&
                  agent !== "Unassigned"
              )
              .slice(0, 5)
              .map((agent) => {

                /*
                  SAFE AGENT VALUE
                */

                const agentName =
                  agent || "Unknown Agent";


                const count =
                  tickets.filter(
                    (ticket) =>
                      ticket.assignee ===
                        agentName &&
                      ticket.status !==
                        "Closed"
                  ).length;


                /*
                  CREATE AGENT INITIALS
                */

                const agentInitials =
                  agentName
                    .split(" ")
                    .filter(Boolean)
                    .map(
                      (item) => item[0]
                    )
                    .join("")
                    .slice(0, 2);


                return (

                  <div
                    className="agent-row"
                    key={agentName}
                  >

                    <div className="agent-avatar">

                      {agentInitials ||
                        "UA"}

                    </div>


                    <div className="agent-name">

                      <strong>
                        {agentName}
                      </strong>

                      <span>
                        Support Agent
                      </span>

                    </div>


                    <div className="agent-ticket-count">

                      <strong>
                        {count}
                      </strong>

                      <span>
                        tickets
                      </span>

                    </div>

                  </div>

                );

              })}

          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;