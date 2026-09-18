import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useHelpdesk } from "../context/HelpdeskContext";

import TicketCard from "../components/TicketCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

import "./Tickets.css";

function Tickets() {
  const { tickets, agents } = useHelpdesk();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [assignee, setAssignee] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const perPage = 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    status,
    priority,
    assignee,
    sort,
  ]);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    const text = search.toLowerCase();

    if (search) {
      result = result.filter(
        (ticket) =>
          ticket.subject
            .toLowerCase()
            .includes(text) ||
          ticket.customer
            .toLowerCase()
            .includes(text) ||
          String(ticket.id).includes(text)
      );
    }

    if (status !== "All") {
      result = result.filter(
        (ticket) => ticket.status === status
      );
    }

    if (priority !== "All") {
      result = result.filter(
        (ticket) => ticket.priority === priority
      );
    }

    if (assignee !== "All") {
      result = result.filter(
        (ticket) => ticket.assignee === assignee
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sort === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    if (sort === "priority") {
      const priorityOrder = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4,
      };

      result.sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );
    }

    if (sort === "customer") {
      result.sort((a, b) =>
        a.customer.localeCompare(b.customer)
      );
    }

    return result;
  }, [
    tickets,
    search,
    status,
    priority,
    assignee,
    sort,
  ]);

  const totalPages = Math.ceil(
    filteredTickets.length / perPage
  );

  const visibleTickets = filteredTickets.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setAssignee("All");
    setSort("newest");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="tickets-page page-animation">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            TICKET MANAGEMENT
          </span>

          <h1>Support Tickets</h1>

          <p>
            Search, assign, prioritize and manage all
            customer support tickets.
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="primary-button"
        >
          + Create Ticket
        </Link>
      </div>

      <div className="ticket-filter-panel">
        <div className="ticket-search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search ticket ID, customer or subject..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option value="All">All Priority</option>
          <option value="Critical">
            Critical
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={assignee}
          onChange={(event) =>
            setAssignee(event.target.value)
          }
        >
          <option value="All">
            All Assignees
          </option>

          {agents.map((agent) => (
            <option
              value={agent}
              key={agent}
            >
              {agent}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
        >
          <option value="newest">
            Newest First
          </option>
          <option value="oldest">
            Oldest First
          </option>
          <option value="priority">
            Priority
          </option>
          <option value="customer">
            Customer A-Z
          </option>
        </select>
      </div>

      <div className="ticket-results-bar">
        <p>
          Showing{" "}
          <strong>{filteredTickets.length}</strong>{" "}
          ticket
          {filteredTickets.length !== 1 && "s"}
        </p>

        <button onClick={clearFilters}>
          Reset Filters
        </button>
      </div>

      <div className="tickets-list">
        {visibleTickets.length === 0 ? (
          <EmptyState
            title="No tickets found"
            description="Try changing your search or filter selection."
          />
        ) : (
          visibleTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Tickets;