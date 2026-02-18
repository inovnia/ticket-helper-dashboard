import { useEffect, useMemo, useState } from "react";
import TicketForm from "./components/TicketForm.jsx";
import TicketList from "./components/TicketList.jsx";
import Filters from "./components/Filters.jsx";
import { loadTickets, saveTickets } from "./lib/storage.js";
import { createTicket, updateTicket, closeTicket } from "./lib/tickets.js";

export default function App() {
  const [tickets, setTickets] = useState(() => loadTickets());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("updatedDesc");
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = [...tickets];

    if (q) {
      result = result.filter((t) => {
        const haystack =
          `${t.title} ${t.description} ${t.requester} ${t.tags.join(" ")}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    if (status !== "all") result = result.filter((t) => t.status === status);
    if (priority !== "all") result = result.filter((t) => t.priority === priority);

    result.sort((a, b) => {
      if (sort === "updatedDesc") return b.updatedAt - a.updatedAt;
      if (sort === "updatedAsc") return a.updatedAt - b.updatedAt;
      if (sort === "createdDesc") return b.createdAt - a.createdAt;
      if (sort === "createdAsc") return a.createdAt - b.createdAt;
      return 0;
    });

    return result;
  }, [tickets, query, status, priority, sort]);

  function handleCreate(data) {
    setTickets((prev) => [createTicket(data), ...prev]);
  }

  function handleUpdate(id, data) {
    setTickets((prev) => prev.map((t) => (t.id === id ? updateTicket(t, data) : t)));
    setEditingTicket(null);
  }

  function handleClose(id) {
    setTickets((prev) => prev.map((t) => (t.id === id ? closeTicket(t) : t)));
  }

  function handleReopen(id) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? updateTicket(t, { status: "open", closedAt: null })
          : t
      )
    );
  }

  function handleDelete(id) {
    if (!confirm("Delete this ticket?")) return;
    setTickets((prev) => prev.filter((t) => t.id !== id));
    if (editingTicket?.id === id) setEditingTicket(null);
  }

  const stats = useMemo(() => {
    const open = tickets.filter((t) => t.status === "open").length;
    const inProgress = tickets.filter((t) => t.status === "in_progress").length;
    const closed = tickets.filter((t) => t.status === "closed").length;
    return { open, inProgress, closed, total: tickets.length };
  }, [tickets]);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Ticket Helper Dashboard</h1>
          <p className="sub">
            Local ticket tracking with search, filters, and status management.
          </p>
        </div>

        <div className="stats">
          <div className="pill">Total: <b>{stats.total}</b></div>
          <div className="pill">Open: <b>{stats.open}</b></div>
          <div className="pill">In Progress: <b>{stats.inProgress}</b></div>
          <div className="pill">Closed: <b>{stats.closed}</b></div>
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2 className="cardTitle">{editingTicket ? "Edit Ticket" : "New Ticket"}</h2>
          <TicketForm
            mode={editingTicket ? "edit" : "create"}
            initial={editingTicket}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() => setEditingTicket(null)}
          />
        </section>

        <section className="card">
          <div className="cardHeader">
            <h2 className="cardTitle">Tickets</h2>
            <Filters
              query={query}
              setQuery={setQuery}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              sort={sort}
              setSort={setSort}
              onReset={() => {
                setQuery("");
                setStatus("all");
                setPriority("all");
                setSort("updatedDesc");
              }}
            />
          </div>

          <TicketList
            tickets={filtered}
            onEdit={(t) => setEditingTicket(t)}
            onClose={handleClose}
            onReopen={handleReopen}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <footer className="footer">
        <span>Storage: LocalStorage</span>
        <span>Stack: React + JS + CSS</span>
      </footer>
    </div>
  );
}

