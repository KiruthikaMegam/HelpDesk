import { createContext, useContext, useEffect, useState } from "react";
import {
  initialTickets,
  agents,
  categories as defaultCategories,
} from "../data/ticketData";

const HelpdeskContext = createContext();

export function HelpdeskProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("helpdeskTickets");

    return saved ? JSON.parse(saved) : initialTickets;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("helpdeskCategories");

    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("helpdeskTickets", JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem("helpdeskCategories", JSON.stringify(categories));
  }, [categories]);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const createTicket = (ticket) => {
    const now = new Date();

    const slaDate = new Date();

    if (ticket.priority === "Critical") {
      slaDate.setHours(slaDate.getHours() + 2);
    } else if (ticket.priority === "High") {
      slaDate.setHours(slaDate.getHours() + 4);
    } else if (ticket.priority === "Medium") {
      slaDate.setHours(slaDate.getHours() + 12);
    } else {
      slaDate.setHours(slaDate.getHours() + 24);
    }

    const newTicket = {
      ...ticket,
      id: Date.now(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      slaDue: slaDate.toISOString(),

      comments: [],

      activities: [
        {
          id: Date.now(),
          text: "Ticket created",
          time: now.toISOString(),
        },
      ],
    };

    setTickets((previous) => [newTicket, ...previous]);

    showToast("Ticket created successfully.");
  };

  const updateTicket = (id, updatedTicket) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === Number(id)
          ? {
              ...ticket,
              ...updatedTicket,
              updatedAt: new Date().toISOString(),

              activities: [
                ...(ticket.activities || []),

                {
                  id: Date.now(),
                  text: "Ticket information updated",
                  time: new Date().toISOString(),
                },
              ],
            }
          : ticket
      )
    );

    showToast("Ticket updated successfully.");
  };

  const deleteTicket = (id) => {
    setTickets((previous) =>
      previous.filter((ticket) => ticket.id !== Number(id))
    );

    showToast("Ticket deleted successfully.");
  };

  const changeStatus = (id, status) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === Number(id)
          ? {
              ...ticket,
              status,
              updatedAt: new Date().toISOString(),

              activities: [
                ...(ticket.activities || []),

                {
                  id: Date.now(),
                  text: `Status changed to ${status}`,
                  time: new Date().toISOString(),
                },
              ],
            }
          : ticket
      )
    );

    showToast(`Status changed to ${status}.`);
  };

  const assignTicket = (id, assignee) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === Number(id)
          ? {
              ...ticket,
              assignee,
              updatedAt: new Date().toISOString(),

              activities: [
                ...(ticket.activities || []),

                {
                  id: Date.now(),
                  text: `Ticket assigned to ${assignee}`,
                  time: new Date().toISOString(),
                },
              ],
            }
          : ticket
      )
    );

    showToast("Ticket assignment updated.");
  };

  const addComment = (ticketId, comment) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === Number(ticketId)
          ? {
              ...ticket,

              comments: [
                ...(ticket.comments || []),

                {
                  id: Date.now(),
                  author: "Support Admin",
                  text: comment,
                  time: new Date().toISOString(),
                },
              ],

              activities: [
                ...(ticket.activities || []),

                {
                  id: Date.now() + 1,
                  text: "New comment added",
                  time: new Date().toISOString(),
                },
              ],
            }
          : ticket
      )
    );

    showToast("Comment added.");
  };

  const addCategory = (category) => {
    const exists = categories.some(
      (item) => item.toLowerCase() === category.toLowerCase()
    );

    if (exists) {
      showToast("Category already exists.", "error");

      return false;
    }

    setCategories((previous) => [...previous, category]);

    showToast("Category added successfully.");

    return true;
  };

  const deleteCategory = (category) => {
    setCategories((previous) =>
      previous.filter((item) => item !== category)
    );

    showToast("Category deleted.");
  };

  return (
    <HelpdeskContext.Provider
      value={{
        tickets,
        categories,
        agents,
        toast,
        showToast,
        createTicket,
        updateTicket,
        deleteTicket,
        changeStatus,
        assignTicket,
        addComment,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </HelpdeskContext.Provider>
  );
}

export function useHelpdesk() {
  return useContext(HelpdeskContext);
}