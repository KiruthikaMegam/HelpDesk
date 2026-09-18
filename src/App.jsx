import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTicket";
import TicketDetails from "./pages/TicketDetails";
import Categories from "./pages/Categories";
import Analytics from "./pages/Analytics";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/tickets/:id/edit" element={<EditTicket />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;