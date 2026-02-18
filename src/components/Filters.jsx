import { PRIORITIES, STATUSES } from "../lib/constants.js";

export default function Filters({
  query,
  setQuery,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
  onReset,
}) {
  return (
    <div className="filters">
      <input
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tickets..."
      />

      <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="all">All status</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <select className="input" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="all">All priority</option>
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="updatedDesc">Updated: New → Old</option>
        <option value="updatedAsc">Updated: Old → New</option>
        <option value="createdDesc">Created: New → Old</option>
        <option value="createdAsc">Created: Old → New</option>
      </select>

      <button className="btn" type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
