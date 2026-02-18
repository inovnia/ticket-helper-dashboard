import TicketRow from "./TicketRow.jsx";

export default function TicketList({ tickets, onEdit, onClose, onReopen, onDelete }) {
  if (!tickets.length) {
    return <div className="empty">No tickets found. Try changing filters or create a new one.</div>;
  }

  return (
    <div className="list">
      {tickets.map((ticket) => (
        <TicketRow
          key={ticket.id}
          ticket={ticket}
          onEdit={onEdit}
          onClose={onClose}
          onReopen={onReopen}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
