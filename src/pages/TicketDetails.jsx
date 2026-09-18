import { useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useHelpdesk } from "../context/HelpdeskContext";

import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import SlaBadge from "../components/SlaBadge";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";

import "./TicketDetails.css";

function TicketDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tickets,
    agents,
    deleteTicket,
    changeStatus,
    assignTicket,
    addComment,
  } = useHelpdesk();

  const ticket = tickets.find(
    (item) => item.id === Number(id)
  );

  const [comment, setComment] = useState("");
  const [showDelete, setShowDelete] =
    useState(false);

  if (!ticket) {
    return (
      <EmptyState
        title="Ticket not found"
        description="The requested ticket is unavailable."
      />
    );
  }

  const handleDelete = () => {
    deleteTicket(ticket.id);

    navigate("/tickets");
  };

  const handleComment = (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      return;
    }

    addComment(ticket.id, comment);

    setComment("");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="ticket-details-page page-animation">
      <div className="ticket-details-header">
        <div className="details-title-area">
          <Link
            to="/tickets"
            className="back-link"
          >
            ← Back to Tickets
          </Link>

          <div className="details-ticket-number">
            Ticket #{ticket.id}
          </div>

          <h1>{ticket.subject}</h1>

          <div className="details-badges">
            <StatusBadge status={ticket.status} />

            <PriorityBadge
              priority={ticket.priority}
            />

            <SlaBadge
              dueDate={ticket.slaDue}
              status={ticket.status}
            />
          </div>
        </div>

        <div className="details-header-actions">
          <Link
            to={`/tickets/${ticket.id}/edit`}
            className="details-edit-button"
          >
            Edit Ticket
          </Link>

          <button
            className="details-delete-button"
            onClick={() => setShowDelete(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="ticket-details-layout">
        <div className="details-main-column">
          <section className="details-card">
            <div className="details-card-heading">
              <h3>Issue Description</h3>

              <span>
                Created {formatDate(ticket.createdAt)}
              </span>
            </div>

            <p className="issue-description">
              {ticket.description}
            </p>

            {ticket.attachments?.length > 0 && (
              <div className="details-attachment-section">
                <h4>
                  Attachments (
                  {ticket.attachments.length})
                </h4>

                <div className="details-attachment-list">
                  {ticket.attachments.map(
                    (attachment) => (
                      <div
                        className="details-attachment"
                        key={attachment}
                      >
                        <div className="details-file-icon">
                          ▱
                        </div>

                        <div>
                          <strong>
                            {attachment}
                          </strong>

                          <span>
                            Attached file
                          </span>
                        </div>

                        <button>View</button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="details-card">
            <div className="details-card-heading">
              <h3>Conversation</h3>

              <span>
                {ticket.comments?.length || 0}{" "}
                comments
              </span>
            </div>

            <div className="comments-list">
              {ticket.comments?.length === 0 ? (
                <div className="comment-empty">
                  No comments yet. Start the
                  conversation below.
                </div>
              ) : (
                ticket.comments.map((item) => (
                  <div
                    className="comment-item"
                    key={item.id}
                  >
                    <div className="comment-avatar">
                      {item.author
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="comment-body">
                      <div className="comment-heading">
                        <strong>
                          {item.author}
                        </strong>

                        <span>
                          {formatDate(item.time)}
                        </span>
                      </div>

                      <p>{item.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              className="comment-form"
              onSubmit={handleComment}
            >
              <textarea
                rows="4"
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                placeholder="Write a reply or internal note..."
              />

              <div className="comment-form-footer">
                <span>
                  Reply as Support Admin
                </span>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </section>

          <section className="details-card">
            <div className="details-card-heading">
              <h3>Activity Timeline</h3>

              <span>Ticket history</span>
            </div>

            <div className="timeline">
              {[...(ticket.activities || [])]
                .reverse()
                .map((activity, index) => (
                  <div
                    className="timeline-item"
                    key={activity.id}
                  >
                    <div className="timeline-marker">
                      <span />

                      {index !==
                        ticket.activities.length -
                          1 && (
                        <div className="timeline-line" />
                      )}
                    </div>

                    <div className="timeline-content">
                      <strong>
                        {activity.text}
                      </strong>

                      <span>
                        {formatDate(activity.time)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>

        <aside className="details-side-column">
          <section className="details-card">
            <div className="details-card-heading">
              <h3>Ticket Management</h3>
            </div>

            <div className="management-field">
              <label>Status</label>

              <select
                value={ticket.status}
                onChange={(event) =>
                  changeStatus(
                    ticket.id,
                    event.target.value
                  )
                }
              >
                <option value="Open">Open</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Pending">
                  Pending
                </option>
                <option value="Resolved">
                  Resolved
                </option>
                <option value="Closed">
                  Closed
                </option>
                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            <div className="management-field">
              <label>Assignee</label>

              <select
                value={ticket.assignee}
                onChange={(event) =>
                  assignTicket(
                    ticket.id,
                    event.target.value
                  )
                }
              >
                {agents.map((agent) => (
                  <option
                    value={agent}
                    key={agent}
                  >
                    {agent}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="details-card">
            <div className="details-card-heading">
              <h3>Customer</h3>
            </div>

            <div className="customer-profile">
              <div className="customer-profile-avatar">
                {ticket.customer
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <strong>{ticket.customer}</strong>

              <span>{ticket.email}</span>
            </div>

            <div className="customer-details">
              <div>
                <span>Phone</span>

                <strong>{ticket.phone}</strong>
              </div>

              <div>
                <span>Category</span>

                <strong>{ticket.category}</strong>
              </div>
            </div>
          </section>

          <section className="details-card sla-details-card">
            <div className="details-card-heading">
              <h3>SLA Information</h3>
            </div>

            <div className="sla-details-row">
              <span>Priority</span>

              <PriorityBadge
                priority={ticket.priority}
              />
            </div>

            <div className="sla-details-row">
              <span>SLA Deadline</span>

              <strong>
                {formatDate(ticket.slaDue)}
              </strong>
            </div>

            <div className="sla-details-row">
              <span>Current Health</span>

              <SlaBadge
                dueDate={ticket.slaDue}
                status={ticket.status}
              />
            </div>
          </section>
        </aside>
      </div>

      <ConfirmModal
        open={showDelete}
        title="Delete ticket?"
        message={`Ticket #${ticket.id} will be permanently removed. This action cannot be undone.`}
        confirmText="Delete Ticket"
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TicketDetails;