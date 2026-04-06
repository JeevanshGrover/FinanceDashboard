import { createSelector } from "@reduxjs/toolkit" // reselect is bundled in RTK

export const selectTransactions = (state) => state.transactions.transactions

export const selectTotalIncome = createSelector(
  selectTransactions,
  (transactions) =>
    transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
)

export const selectTotalExpenses = createSelector(
  selectTransactions,
  (transactions) =>
    transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
)

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpenses,
  (income, expenses) => income - expenses
)

export const selectTopCategory = createSelector(
  selectTransactions,
  (transactions) => {
    const expenses = transactions.filter(t => t.type === "expense")
    const map = {}

    expenses.forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })

    const entries = Object.entries(map)
    if (!entries.length) return null

    const [category, amount] = entries.reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    )

    return { category, amount }
  }
)

export const selectSavingsRate = createSelector(
  selectTotalIncome,
  selectTotalExpenses,
  (income, expenses) => {
    if (income === 0) return 0
    return ((income - expenses) / income) * 100
  }
)

export const selectExpenseChange = createSelector(
  selectTransactions,
  (transactions) => {
    const monthly = {}

    transactions.forEach(t => {
      const date = new Date(t.date)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!monthly[key]) monthly[key] = 0
      if (t.type === "expense") monthly[key] += t.amount
    })

    const values = Object.values(monthly)
    if (values.length < 2) return 0

    const last = values[values.length - 1]
    const prev = values[values.length - 2]
    if (prev === 0) return 0

    return ((last - prev) / prev) * 100
  }
)