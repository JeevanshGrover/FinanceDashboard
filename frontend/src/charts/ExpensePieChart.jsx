import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useState } from "react";

function ExpensePieChart() {
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const [activeIndex, setActiveIndex] = useState(null);

  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const data = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const COLORS = [
    "#1f3d2b",
    "#4b7f52",
    "#c05621",
    "#7b5e57",
    "#a3b18a",
    "#d6ccc2",
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      
      {/* 🍩 Chart */}
      <div className="w-full sm:w-1/2"style={{ height: 256 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  // 🔥 Grow active slice
                  style={{
                    transform:
                      index === activeIndex
                        ? "scale(1.05)"
                        : "scale(1)",
                    transformOrigin: "center",
                    transition: "0.2s",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 List */}
      <div className="w-full sm:w-1/3 space-y-3">
        {data.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.name}
              className={`flex justify-between items-center text-sm transition ${
                isActive ? "scale-105 font-semibold" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />
                <span
                  className={
                    isActive ? "text-black" : "text-gray-600"
                  }
                >
                  {item.name}
                </span>
              </div>

              <span>₹{item.value.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpensePieChart;