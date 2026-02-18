import { useEffect, useMemo, useState } from "react";
import { PRIORITIES, STATUSES } from "../lib/constants.js";

export default function TicketForm({ mode, initial, onCreate, onUpdate, onCancel }) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [requester, setRequester] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("open");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title || "");
    setRequester(initial.requester || "");
    setPriority(initial.priority || "medium");
    setStatus(initial.status || "open");
    setTags((initial.tags || []).join(", "));
    setDescription(initial.description || "");
  }, [initial]);

  const canSubmit = useMemo(() => {
    return title.trim().length >= 3 && requester.trim().length >= 2;
  }, [title, requester]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const data = {
      title: title.trim(),
      requester: requester.trim(),
      priority,
      status,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description: description.trim(),
    };

    if (isEdit) onUpdate(initial.id, data);
    else {
      onCreate(data);
      setTitle("");
      setRequester("");
      setPriority("medium");
      setStatus("open");
      setTags("");
      setDescription("");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Title
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. VPN access request"
        />
      </label>

      <label className="label">
        Requester
        <input
          className="input"
          value={requester}
          onChange={(e) => setRequester(e.target.value)}
          placeholder="e.g. Sarah M."
        />
      </label>

      <div className="row">
        <label className="label">
          Priority
          <select className="input" value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          Status
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="label">
        Tags (comma separated)
        <input
          className="input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. vpn, access, urgent"
        />
      </label>

      <label className="label">
        Description
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details, steps tried, error messages, etc."
          rows={5}
        />
      </label>

      <div className="actions">
        {isEdit ? (
          <>
            <button className="btn primary" type="submit" disabled={!canSubmit}>
              Save changes
            </button>
            <button className="btn" type="button" onClick={onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn primary" type="submit" disabled={!canSubmit}>
            Create ticket
          </button>
        )}
      </div>

      {!canSubmit && (
        <p className="hint">Title needs 3+ chars and requester needs 2+ chars.</p>
      )}
    </form>
  );
}
