import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import SlaBadge from "./SlaBadge";

import "./TicketCard.css";

function TicketCard({ ticket }) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-main">
        <div className="ticket-card-heading">
          <div>
            <span className="ticket-number">
              #{ticket.id}
            </span>

            <Link
              to={`/tickets/${ticket.id}`}
              className="ticket-title"
            >
              {ticket.subject}
            </Link>
          </div>

          <StatusBadge status={ticket.status} />
        </div>

        <p className="ticket-description">
          {ticket.description}
        </p>

        <div className="ticket-card-meta">
          <div>
            <span className="ticket-meta-label">
              Customer
            </span>

            <strong>{ticket.customer}</strong>
          </div>

          <div>
            <span className="ticket-meta-label">
              Category
            </span>

            <strong>{ticket.category}</strong>
          </div>

          <div>
            <span className="ticket-meta-label">
              Assignee
            </span>

            <strong>{ticket.assignee}</strong>
          </div>
        </div>
      </div>

      <div className="ticket-card-side">
        <PriorityBadge priority={ticket.priority} />

        <SlaBadge
          dueDate={ticket.slaDue}
          status={ticket.status}
        />

        <Link
          to={`/tickets/${ticket.id}`}
          className="ticket-view-button"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default TicketCard;