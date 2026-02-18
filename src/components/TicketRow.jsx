import { formatTime } from "../lib/time.js";

function labelStatus(status) {
  if (status === "in_progress") return "In Progress";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function labelPriority(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export default function TicketRow({ ticket, onEdit, onClose, onReopen, onDelete }) {
  return (
    <article className={`ticket ${ticket.status === "closed" ? "closed" : ""}`}>
      <div className="ticketTop">
        <div className="ticketTitle">
          <span className="title">{ticket.title}</span>
          <span className={`badge pri ${ticket.priority}`}>{labelPriority(ticket.priority)}</span>
          <span className={`badge st ${ticket.status}`}>{labelStatus(ticket.status)}</span>
        </div>

        <div className="actions">
          <button className="btn sm" type="button" onClick={() => onEdit(ticket)}>
            Edit
          </button>
          {ticket.status === "closed" ? (
            <button className="btn sm" type="button" onClick={() => onReopen(ticket.id)}>
              Reopen
            </button>
          ) : (
            <button className="btn sm" type="button" onClick={() => onClose(ticket.id)}>
              Close
            </button>
          )}
          <button className="btn sm danger" type="button" onClick={() => onDelete(ticket.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="ticketMeta">
        <span>Requester: {ticket.requester}</span>
        <span>Created: {formatTime(ticket.createdAt)}</span>
        <span>Updated: {formatTime(ticket.updatedAt)}</span>
      </div>

      {ticket.description ? <p className="ticketDesc">{ticket.description}</p> : null}

      {ticket.tags?.length ? (
        <div className="tags">
          {ticket.tags.map((tag) => (
            <span key={`${ticket.id}-${tag}`} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
