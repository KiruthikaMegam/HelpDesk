import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ open, closeSidebar }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "▦",
    },
    {
      name: "Tickets",
      path: "/tickets",
      icon: "▤",
    },
    {
      name: "Create Ticket",
      path: "/tickets/create",
      icon: "+",
    },
    {
      name: "Categories",
      path: "/categories",
      icon: "◇",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "⌁",
    },
  ];

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">T</div>

        <div>
          <h2>TicketEase</h2>
          <span>Support Center</span>
        </div>

        <button
          className="sidebar-close"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link sidebar-link-active"
                : "sidebar-link"
            }
            onClick={closeSidebar}
          >
            <span className="sidebar-icon">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* <div className="sidebar-support-box">
        <span className="support-box-icon">?</span>

        <div>
          <strong>Need help?</strong>
          <p>Check support resources and documentation.</p>
        </div>
      </div> */}

      <div className="sidebar-profile">
        <div className="profile-avatar">KS</div>

        <div className="profile-info">
          <strong>Kiruthika</strong>
          <span>Support Admin</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;