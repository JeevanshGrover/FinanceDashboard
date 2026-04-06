import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function BarGraph() {
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const data = useMemo(() => {
    const map = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" });

      if (!map[month]) {
        map[month] = { month, income: 0, expense: 0 };
      }

      if (t.type === "income") {
        map[month].income += t.amount;
      } else {
        map[month].expense += t.amount;
      }
    });

    return Object.values(map);
  }, [transactions]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="income" fill="#6B8E6B" />
          <Bar dataKey="expense" fill="#C75B39" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;