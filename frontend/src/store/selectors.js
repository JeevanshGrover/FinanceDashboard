export const selectTransactions = (state) => state.transactions.transactions

export const selectTotalIncome = (state) =>
  state.transactions.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

export const selectTotalExpenses = (state) =>
  state.transactions.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

export const selectBalance = (state) => {
  const income = selectTotalIncome(state)
  const expenses = selectTotalExpenses(state)
  return income - expenses
}

export const selectTopCategory = (state) => {
  const expenses = state.transactions.transactions.filter(
    (t) => t.type === "expense"
  );

  const map = {};

  expenses.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });

  const entries = Object.entries(map);

  if (!entries.length) return null;

  const [category, amount] = entries.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );

  return { category, amount };
};

export const selectExpenseChange = (state) => {
  const transactions = state.transactions.transactions;

  const monthly = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthly[key]) monthly[key] = 0;

    if (t.type === "expense") {
      monthly[key] += t.amount;
    }
  });

  const values = Object.values(monthly);

  if (values.length < 2) return 0;

  const last = values[values.length - 1];
  const prev = values[values.length - 2];

  if (prev === 0) return 0;

  return ((last - prev) / prev) * 100;
};

export const selectSavingsRate = (state) => {
  const income = selectTotalIncome(state);
  const expenses = selectTotalExpenses(state);

  if (income === 0) return 0;

  return ((income - expenses) / income) * 100;
};