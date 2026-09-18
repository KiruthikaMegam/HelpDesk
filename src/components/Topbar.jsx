import { Link } from "react-router-dom";
import "./Topbar.css";

function Topbar({ openSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-button"
          onClick={openSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div>
          <h3>Support Workspace</h3>
          <p>Manage customer requests and conversations</p>
        </div>
      </div>

      <div className="topbar-right">
        <Link
          to="/tickets/create"
          className="topbar-create"
        >
          <span>+</span>

          <span className="topbar-create-text">
            New Ticket
          </span>
        </Link>

        <div className="topbar-user">
          <div className="topbar-avatar">KS</div>

          <div>
            <strong>Kiruthika</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;