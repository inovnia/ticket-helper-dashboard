# Ticket Helper Dashboard

A lightweight help-desk style ticket management app built with React and Vite.
It supports ticket creation, updates, status workflows, filtering, sorting, and local persistence.

## Why This Project

This project demonstrates practical front-end engineering skills for real product workflows:

- Building reusable UI components with clear state boundaries
- Managing form state and validation in React
- Implementing searchable/filterable data views
- Persisting client-side data with safe localStorage handling
- Structuring code for readability and maintainability

## Features

- Create, edit, close, reopen, and delete tickets
- Search tickets by title, description, requester, and tags
- Filter by status and priority
- Sort by created/updated timestamp (ascending/descending)
- Live dashboard stats (total/open/in progress/closed)
- Responsive layout for desktop and mobile
- Data persistence using `localStorage`

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES Modules)
- CSS
- ESLint

## Project Structure

```txt
src/
  components/
    TicketForm.jsx
    TicketList.jsx
    TicketRow.jsx
    Filters.jsx
  lib/
    tickets.js     # ticket creation/update workflow logic
    storage.js     # localStorage load/save helpers
    constants.js   # status/priority constants
    time.js        # time formatting utility
  App.jsx
  styles.css
```

## Getting Started

### 1. Clone

```bash
git clone https://github.com/inovnia/ticket-helper-dashboard.git
cd ticket-helper-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## Core Implementation Notes

- Tickets are modeled with timestamps (`createdAt`, `updatedAt`, `closedAt`) and immutable update patterns.
- Filtering and sorting are derived with memoized computations in `App.jsx`.
- Persistence is isolated in `src/lib/storage.js` with safe JSON parsing and fallback behavior.

## What I Would Improve Next

- Add automated tests (unit + component tests)
- Add server-backed persistence/API integration
- Add authentication and role-based views
- Add pagination or virtualization for very large ticket lists

## Author

Sonia Sabet  
GitHub: https://github.com/inovnia
