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
      <h2 className="text-xl font-semibold"></h2>

      {/* 🔷 INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Top Spending */}
        <div className="p-4 border rounded-lg">
          <p className="text-sm">Top Spending</p>
          <h3 className="text-lg font-semibold mt-1">
            {topCategory ? topCategory.category : "N/A"}
          </h3>
          <p className="text-sm mt-1">
            ₹{topCategory ? topCategory.amount : 0}
          </p>
        </div>

        {/* Savings Rate */}
        <div className="p-4 border rounded-lg">
          <p className="text-sm">Savings Rate</p>
          <h3 className="text-lg font-semibold mt-1">
            {savingsRate.toFixed(1)}%
          </h3>
          <p className="text-sm mt-1">Overall</p>
        </div>

        {/* Expense Change */}
        <div className="p-4 border rounded-lg">
          <p className="text-sm">Expense Change</p>
          <h3 className="text-lg font-semibold mt-1">
            {expenseChange.toFixed(1)}%
          </h3>
          <p className="text-sm mt-1">vs last month</p>
        </div>

      </div>

      {/* 🔷 GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Expense Breakdown</h3>
          <ExpensePieChart/>
        </div>

        {/* Bar Chart */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Monthly Comparison</h3>
          <BarGraph />
        </div>

      </div>

    </div>
  );
}

export default Insights;