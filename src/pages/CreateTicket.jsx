import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useHelpdesk } from "../context/HelpdeskContext";

import "./TicketForm.css";

function CreateTicket() {
  const navigate = useNavigate();

  const {
    createTicket,
    categories,
    agents,
  } = useHelpdesk();

  const [form, setForm] = useState({
    subject: "",
    customer: "",
    email: "",
    phone: "",
    category: "",
    priority: "Medium",
    status: "Open",
    assignee: "Unassigned",
    description: "",
    attachments: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleAttachment = (event) => {
    const files = Array.from(event.target.files);

    setForm({
      ...form,
      attachments: files.map(
        (file) => file.name
      ),
    });
  };

  const removeAttachment = (name) => {
    setForm({
      ...form,
      attachments: form.attachments.filter(
        (item) => item !== name
      ),
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.subject) {
      nextErrors.subject =
        "Ticket subject is required.";
    }

    if (!form.customer) {
      nextErrors.customer =
        "Customer name is required.";
    }

    if (!form.email) {
      nextErrors.email =
        "Email address is required.";
    } else if (
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!form.phone) {
      nextErrors.phone =
        "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone)) {
      nextErrors.phone =
        "Phone number must contain 10 digits.";
    }

    if (!form.category) {
      nextErrors.category =
        "Please choose a category.";
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

    createTicket(form);

    navigate("/tickets");
  };

  return (
    <div className="ticket-form-page page-animation">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            NEW REQUEST
          </span>

          <h1>Create Ticket</h1>

          <p>
            Add a new customer support request and
            assign it to your team.
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
              01
            </div>

            <div>
              <h3>Ticket Information</h3>
              <p>
                Enter the issue details and customer
                information.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group form-full">
              <label>
                Ticket Subject
                <span>*</span>
              </label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Example: Unable to access account"
                className={
                  errors.subject
                    ? "input-error"
                    : ""
                }
              />

              {errors.subject && (
                <small className="field-error">
                  {errors.subject}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Customer Name
                <span>*</span>
              </label>

              <input
                name="customer"
                value={form.customer}
                onChange={handleChange}
                placeholder="Customer name"
                className={
                  errors.customer
                    ? "input-error"
                    : ""
                }
              />

              {errors.customer && (
                <small className="field-error">
                  {errors.customer}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Email
                <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="customer@example.com"
                className={
                  errors.email
                    ? "input-error"
                    : ""
                }
              />

              {errors.email && (
                <small className="field-error">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Phone Number
                <span>*</span>
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                maxLength="10"
                className={
                  errors.phone
                    ? "input-error"
                    : ""
                }
              />

              {errors.phone && (
                <small className="field-error">
                  {errors.phone}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Category
                <span>*</span>
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={
                  errors.category
                    ? "input-error"
                    : ""
                }
              >
                <option value="">
                  Choose category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <small className="field-error">
                  {errors.category}
                </small>
              )}
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
              </select>
            </div>

            <div className="form-group">
              <label>Assign To</label>

              <select
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
              >
                {agents.map((agent) => (
                  <option
                    key={agent}
                    value={agent}
                  >
                    {agent}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group form-full">
              <label>
                Description
                <span>*</span>
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="7"
                placeholder="Describe the customer's issue in detail..."
                className={
                  errors.description
                    ? "input-error"
                    : ""
                }
              />

              <div className="textarea-helper">
                <span>
                  {errors.description || ""}
                </span>

                <span>
                  {form.description.length}
                  /1000
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="ticket-form-side">
          <section className="ticket-form-card">
            <div className="form-section-heading">
              <div className="form-section-icon">
                02
              </div>

              <div>
                <h3>Attachments</h3>

                <p>Add supporting files.</p>
              </div>
            </div>

            <label className="attachment-drop">
              <input
                type="file"
                multiple
                onChange={handleAttachment}
              />

              <div className="attachment-drop-icon">
                ↑
              </div>

              <strong>
                Upload supporting files
              </strong>

              <span>
                PNG, JPG, PDF, DOC
              </span>
            </label>

            {form.attachments.length > 0 && (
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

                    <button
                      type="button"
                      onClick={() =>
                        removeAttachment(file)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="form-help-card">
            <div className="form-help-icon">
              i
            </div>

            <div>
              <strong>SLA Information</strong>

              <p>
                SLA due time is calculated
                automatically using ticket priority.
              </p>
            </div>
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/tickets")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Create Ticket
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

export default CreateTicket;