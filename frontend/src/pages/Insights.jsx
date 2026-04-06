import { useSelector } from "react-redux";
import {
  selectTopCategory,
  selectSavingsRate,
  selectExpenseChange,
} from "../store/selectors.js";

import ExpensePieChart from "../charts/ExpensePieChart.jsx";
import BarGraph from "../charts/BarGraph.jsx";

function Insights() {
  const topCategory = useSelector(selectTopCategory);
  const savingsRate = useSelector(selectSavingsRate);
  const expenseChange = useSelector(selectExpenseChange);

  return (
    <div className="space-y-6">

      {/* 🔷 HEADER */}
      <h2 className="text-2xl [font-family:var(--font-heading)]">Insights</h2>

      {/* 🔷 INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Top Spending */}
        <div className="rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
          <p className="text-sm text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">Top Spending</p>
          <h3 className="text-lg font-semibold mt-1">
            {topCategory ? topCategory.category : "N/A"}
          </h3>
          <p className="text-sm mt-1 text-[var(--color-danger)]">
            ₹{topCategory ? topCategory.amount : 0}
          </p>
        </div>

        {/* Savings Rate */}
        <div className="rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
          <p className="text-sm text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">Savings Rate</p>
          <h3 className="text-lg font-semibold mt-1">
            {savingsRate.toFixed(1)}%
          </h3>
          <p className="text-sm mt-1 text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">Overall</p>
        </div>

        {/* Expense Change */}
        <div className="rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
          <p className="text-sm text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">Expense Change</p>
          <h3 className="text-lg font-semibold mt-1">
            {expenseChange.toFixed(1)}%
          </h3>
          <p className="text-sm mt-1 text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">vs last month</p>
        </div>

      </div>

      {/* 🔷 GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
          <h3 className="mb-4 text-xl [font-family:var(--font-heading)]">Expense Breakdown</h3>
          <ExpensePieChart/>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
          <h3 className="mb-4 text-xl [font-family:var(--font-heading)]">Monthly Comparison</h3>
          <BarGraph />
        </div>

      </div>

    </div>
  );
}

export default Insights;