function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

export function createTicket(data) {
  const now = Date.now();
  return {
    id: uid(),
    title: data.title,
    requester: data.requester,
    priority: data.priority,
    status: data.status,
    tags: data.tags || [],
    description: data.description || "",
    createdAt: now,
    updatedAt: now,
    closedAt: data.status === "closed" ? now : null,
  };
}

export function updateTicket(ticket, updates) {
  const now = Date.now();
  const next = {
    ...ticket,
    ...updates,
    updatedAt: now,
  };

  if (updates.status === "closed") next.closedAt = now;
  return next;
}

export function closeTicket(ticket) {
  return updateTicket(ticket, { status: "closed" });
}
