import React from 'react'
import { useSelector } from 'react-redux'
import SummaryCard from '../components/dashboard/SummaryCard.jsx'
import {
  selectTotalIncome,
  selectTotalExpenses,
  selectBalance
} from '../store/selectors.js'
import TrendsChart from '../charts/TrendsChart.jsx'
import PieChart from '../charts/ExpensePieChart.jsx'


function Dashboard() {
  const income = useSelector(selectTotalIncome);
  const expenses = useSelector(selectTotalExpenses);
  const balance = useSelector(selectBalance);

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row gap-4">
        <SummaryCard title="Total Income" value={income} type="income" />
        <SummaryCard title="Total Expenses" value={expenses} type="expense" />
        <SummaryCard title="Net Balance" value={balance} type="balance" />
      </div>

      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <div>
          <h1>Cash flow Trend</h1>
          <span className='text-sm text-gray-500'>Last 6 months</span>
        </div>
          
        <TrendsChart/>
  
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <PieChart/>
      </div>

    </div>
  );
}

export default Dashboard