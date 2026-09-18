import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useHelpdesk } from "../context/HelpdeskContext";

import EmptyState from "../components/EmptyState";

import "./TicketForm.css";

function EditTicket() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tickets,
    categories,
    agents,
    updateTicket,
  } = useHelpdesk();

  const ticket = tickets.find(
    (item) => item.id === Number(id)
  );

  const [form, setForm] = useState(
    ticket
      ? {
          subject: ticket.subject,
          customer: ticket.customer,
          email: ticket.email,
          phone: ticket.phone,
          category: ticket.category,
          priority: ticket.priority,
          status: ticket.status,
          assignee: ticket.assignee,
          description: ticket.description,
          attachments:
            ticket.attachments || [],
        }
      : null
  );

  const [errors, setErrors] = useState({});

  if (!ticket || !form) {
    return (
      <EmptyState
        title="Ticket not found"
        description="This ticket does not exist or may have been deleted."
      />
    );
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.subject) {
      nextErrors.subject =
        "Subject is required.";
    }

    if (!form.customer) {
      nextErrors.customer =
        "Customer is required.";
    }

    if (!form.email) {
      nextErrors.email = "Email is required.";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      nextErrors.phone =
        "Enter a valid 10 digit phone number.";
    }

    if (!form.description) {
      nextErrors.description =
        "Description is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    updateTicket(id, form);

    navigate(`/tickets/${id}`);
  };

  return (
    <div className="ticket-form-page page-animation">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            EDIT TICKET #{ticket.id}
          </span>

          <h1>Edit Ticket</h1>

          <p>
            Update ticket details, assignment,
            priority or current status.
          </p>
        </div>
      </div>

      <form
        className="ticket-form-layout"
        onSubmit={handleSubmit}
      >
        <section className="ticket-form-card">
          <div className="form-section-heading">
            <div className="form-section-icon">
              ✎
            </div>

            <div>
              <h3>Ticket Information</h3>

              <p>
                Modify the support request details.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group form-full">
              <label>Ticket Subject</label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />

              {errors.subject && (
                <small className="field-error">
                  {errors.subject}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Customer Name</label>

              <input
                name="customer"
                value={form.customer}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength="10"
              />

              {errors.phone && (
                <small className="field-error">
                  {errors.phone}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option
                    value={category}
                    key={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">
                  Medium
                </option>
                <option value="High">High</option>
                <option value="Critical">
                  Critical
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
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

            <div className="form-group">
              <label>Assignee</label>

              <select
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
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

            <div className="form-group form-full">
              <label>Description</label>

              <textarea
                rows="8"
                name="description"
                value={form.description}
                onChange={handleChange}
              />

              {errors.description && (
                <small className="field-error">
                  {errors.description}
                </small>
              )}
            </div>
          </div>
        </section>

        <aside className="ticket-form-side">
          <section className="ticket-form-card">
            <div className="form-section-heading">
              <div className="form-section-icon">
                ▱
              </div>

              <div>
                <h3>Attachments</h3>

                <p>Current ticket files</p>
              </div>
            </div>

            {form.attachments.length === 0 ? (
              <div className="small-empty-box">
                No attachments added.
              </div>
            ) : (
              <div className="attachment-list">
                {form.attachments.map((file) => (
                  <div
                    className="attachment-item"
                    key={file}
                  >
                    <div>
                      <span className="attachment-file-icon">
                        ▱
                      </span>

                      <strong>{file}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                navigate(`/tickets/${id}`)
              }
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

export default EditTicket;