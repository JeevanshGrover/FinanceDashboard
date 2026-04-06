import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setRole } from "../../store/UiSlice.js"
import { deleteTransaction } from '../../store/TransactionSlice.js';

function TransactionTable() {
    const transactions = useSelector((state) => state.transactions.transactions);
    const { filters, role } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState("date");
    const [sortDir, setSortDir] = useState("desc");
    const [page, setPage] = useState(0);

    const processed = useMemo(() => {
        let data = [...transactions];

        // Search
        if (search) {
            data = data.filter(
                (t) =>
                    t.note.toLowerCase().includes(search.toLowerCase()) ||
                    t.category.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filters.type !== "all") {
            data = data.filter((t) => t.type === filters.type);
        }

        if (filters.category !== "all") {
            data = data.filter((t) => t.category.toLowerCase() === filters.category.toLowerCase())
        }

        // Sorting
        data.sort((a, b) => {
            const aVal = sortBy === "date" ? new Date(a.date) : a.amount;
            const bVal = sortBy === "date" ? new Date(b.date) : b.amount;
            return sortDir === "desc" ? bVal - aVal : aVal - bVal;
        });

        return data;
    }, [transactions, filters, search, sortBy, sortDir]);

    const page_size = 8;
    const paginated = processed.slice(
        page * page_size, (page + 1) * page_size
    )

    const totalPages = Math.ceil(processed.length / page_size)

    const handleSort = (col) => {
        if (sortBy === col) {
            setSortDir((prev) => (prev === "desc" ? "asc" : "desc"))
        }
        else {
            setSortBy(col)
            setSortDir("desc")
        }
    }

    const categories = useMemo(() => {
  const set = new Set(transactions.map((t) => t.category));
  return Array.from(set);
}, [transactions]);

    return (
        <div className='p-10 sm:p-20'>
            <div className='flex flex-wrap gap-10 mb-15 '>
                <input
                    type="text"
                    placeholder='search...'
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                />

                <select
  onChange={(e) =>
    dispatch(setFilter({ category: e.target.value }))
  }
>
  <option value="all">All</option>

  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

                <select
                    onChange={(e) =>
                        dispatch(setFilter({ type: e.target.value }))
                    }
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            {paginated.length === 0 ? (
                <p>No transactions found</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className="min-w-150 w-full border border-gray-300 border-collapse [&_th]:p-2 [&_td]:p-2 [&_th]:border [&_td]:border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th
                                onClick={() => handleSort("date")}
                                className="cursor-pointer"
                            >
                                Date{" "}
                                {sortBy === "date"
                                    ? sortDir === "desc"
                                        ? "↓"
                                        : "↑"
                                    : ""}
                            </th>

                            <th>Description</th>
                            <th>Category</th>

                            <th
                                onClick={() => handleSort("amount")}
                                className="cursor-pointer"
                            >
                                Amount{" "}
                                {sortBy === "amount"
                                    ? sortDir === "desc"
                                        ? "↓"
                                        : "↑"
                                    : ""}
                            </th>

                            {role === "admin" && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50">
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td>{t.note}</td>
                                <td>{t.category}</td>

                                <td
                                    className={
                                        t.type === "income"
                                            ? "text-green-500 font-medium"
                                            : "text-red-500 font-medium"
                                    }
                                >
                                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                                </td>
                                {role === "admin" && (
                                    <td>
                                        <button
                                            onClick={() =>
                                                dispatch(deleteTransaction(t.id))
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-3 flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`px-3 py-1 border rounded 
          ${page === i
                                    ? "bg-blue-500 text-white font-semibold"
                                    : "bg-white text-gray-700 hover:bg-gray-100"}
        `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

        </div>
    )
}

export default TransactionTable