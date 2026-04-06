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

      <div className="space-y-3 rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
        <div>
          <h1 className="[font-family:var(--font-heading)] text-xl">Cash flow Trend</h1>
          <span className='text-sm text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]'>Last 6 months</span>
        </div>
        <div className='px-16'>
          <TrendsChart/>
        </div>
  
      </div>

      <div className="rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] px-8 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
        <PieChart/>
      </div>

    </div>
  );
}

export default Dashboard