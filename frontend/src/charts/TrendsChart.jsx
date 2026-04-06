import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

function TrendsChart() {
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  // 🔹 Get last 6 months (including current)
  const getLast6Months = () => {
    const months = [];
    const date = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      const month = d.toLocaleString("default", { month: "short" });

      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`, // unique
        label: month,
        income: 0,
        expense: 0,
      });
    }

    return months;
  };

  const last6Months = getLast6Months();

  // 🔹 Fill data from transactions
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;

    const monthObj = last6Months.find((m) => m.key === key);

    if (monthObj) {
      if (t.type === "income") {
        monthObj.income += t.amount;
      } else {
        monthObj.expense += t.amount;
      }
    }
  });

  // 🔥 Final data
  const data = last6Months.map((m) => ({
    month: m.label,
    income: m.income,
    expense: m.expense,
  }));

  return (
    <div className="w-full h-80">
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />

          <Tooltip />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#6B8E6B"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#C75B39"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TrendsChart;