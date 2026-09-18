import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "./Toast";

import { useHelpdesk } from "../context/HelpdeskContext";

import "./Layout.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { toast } = useHelpdesk();

  return (
    <div className="helpdesk-layout">
      <Sidebar
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="helpdesk-main">
        <Topbar openSidebar={() => setSidebarOpen(true)} />

        <main className="helpdesk-content">
          <Outlet />
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default Layout;