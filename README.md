# FinLens — Finance Dashboard UI

The goal was to design a clean, interactive interface for tracking and understanding financial activity — covering a dashboard overview, transaction management, spending insights, and role-based UI behavior.

> **Frontend-only project.** All data is mocked and managed in client-side state. No backend or authentication required.

---

## Features

### Dashboard
- Summary cards: Total Balance, Income, Expenses
- Monthly balance trend chart (time-based)
- Spending breakdown by category (categorical)

### Transactions
- Full transaction table with date, amount, category, and type
- Keyword search across transactions
- Filter by category or type (income/expense)
- Sort by date or amount
- Pagination for larger datasets

### Role-Based UI
- **Viewer** — read-only: browse dashboard, filter transactions, explore insights
- **Admin** — adds controls for creating and deleting transactions
- Switched via a toggle/dropdown in the UI — no login required

### Insights
- Highest spending category
- Savings rate indicator
- Month-over-month expense comparison
- Supporting charts for category and monthly breakdown

### Additional
- Light and dark theme with persistent preference via `localStorage`
- Graceful empty states when no data matches filters
- Smooth transitions and hover interactions throughout

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React (Vite) | Component model, fast dev experience |
| Styling | Tailwind CSS | Rapid utility-based styling, responsive helpers |
| State Management | Redux Toolkit | Predictable centralized state, good for shared UI logic |
| Routing | React Router | Simple route-level page separation |
| Charts | Recharts | Lightweight, composable chart components |

---

## Project Structure

```bash
frontend/
├── src/
│   ├── components/        # Reusable UI modules (Header, Sidebar, Cards, Table, Forms)
│   ├── pages/             # Route-level screens
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── Insights.jsx
│   ├── charts/            # Chart components
│   ├── store/             # Redux slices and selectors
│   │   ├── UiSlice.js     # Theme, role, sidebar, modal, filter state
│   │   ├── TransactionSlice.js
│   │   ├── selectors.js
│   │   └── store.js
│   ├── styles/
│   │   └── design-tokens.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

---

## State Management Approach

All application state is handled through Redux Toolkit, split across two slices:

- **`TransactionSlice`** — holds the mock transaction dataset and handles add/delete actions
- **`UiSlice`** — manages role selection, active filters, search term, theme, sidebar visibility, and modal state

Derived values (filtered and sorted transaction lists, aggregated metrics) are computed in `selectors.js` and consumed directly by page components. This keeps components free of transformation logic and makes state changes predictable.

---

## Setup
```bash
git clone <repo-url>
cd finlens/frontend
npm install
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

---

## Assumptions Made

- Transaction data is seeded as static mock data on app load; it resets on page refresh (no persistence beyond theme preference)
- Role switching is purely a UI simulation — there is no authentication or protected routing
- "Monthly comparison" in Insights compares the current month's expenses to the previous month using the mock dataset

---

## Possible Future Improvements

- Backend/API integration for real data persistence
- Proper authentication with protected routes
- Date range filtering and forecasting
- CSV/JSON export
- Unit and integration test coverage
