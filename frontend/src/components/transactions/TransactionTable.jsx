import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from "../../store/UiSlice.js"
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
        <div className='rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sm:p-6'>
            <div className='mb-4 flex flex-wrap gap-3'>
                <input
                    type="text"
                    placeholder='search...'
                    className='h-10 min-w-44 rounded-xl border border-[var(--color-muted)] bg-[var(--color-surface)] px-3 text-[var(--color-text)] outline-none transition duration-200 placeholder:text-[color-mix(in_srgb,var(--color-text)_50%,transparent)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                />

                <select
  className='h-10 min-w-36 rounded-xl border border-[var(--color-muted)] bg-[var(--color-surface)] px-3 text-[var(--color-text)] outline-none transition duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
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
                    className='h-10 min-w-36 rounded-xl border border-[var(--color-muted)] bg-[var(--color-surface)] px-3 text-[var(--color-text)] outline-none transition duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
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
                <p className='py-4 text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]'>No transactions found</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className="min-w-[720px] w-full border-separate border-spacing-0">
                    <thead className="bg-[color-mix(in_srgb,var(--color-muted)_35%,transparent)]">
                        <tr>
                            <th
                                onClick={() => handleSort("date")}
                                className="cursor-pointer select-none border-b border-[var(--color-muted)] p-3 text-left font-semibold text-[color-mix(in_srgb,var(--color-text)_85%,transparent)]"
                            >
                                Date{" "}
                                {sortBy === "date"
                                    ? sortDir === "desc"
                                        ? "↓"
                                        : "↑"
                                    : ""}
                            </th>

                            <th className="border-b border-[var(--color-muted)] p-3 text-left font-semibold text-[color-mix(in_srgb,var(--color-text)_85%,transparent)]">Description</th>
                            <th className="border-b border-[var(--color-muted)] p-3 text-left font-semibold text-[color-mix(in_srgb,var(--color-text)_85%,transparent)]">Category</th>

                            <th
                                onClick={() => handleSort("amount")}
                                className="cursor-pointer select-none border-b border-[var(--color-muted)] p-3 text-right font-semibold text-[color-mix(in_srgb,var(--color-text)_85%,transparent)]"
                            >
                                Amount{" "}
                                {sortBy === "amount"
                                    ? sortDir === "desc"
                                        ? "↓"
                                        : "↑"
                                    : ""}
                            </th>

                            {role === "admin" && <th className="border-b border-[var(--color-muted)] p-3 text-right font-semibold text-[color-mix(in_srgb,var(--color-text)_85%,transparent)]">Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((t) => (
                            <tr key={t.id} className="group odd:bg-transparent even:bg-[color-mix(in_srgb,var(--color-muted)_20%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-muted)_40%,transparent)] transition-colors duration-200">
                                <td className='border-b border-[var(--color-muted)] p-3'>{new Date(t.date).toLocaleDateString()}</td>
                                <td className='border-b border-[var(--color-muted)] p-3'>{t.note}</td>
                                <td className='border-b border-[var(--color-muted)] p-3'>{t.category}</td>

                                <td
                                    className={
                                        t.type === "income"
                                            ? "border-b border-[var(--color-muted)] p-3 text-right font-medium text-[var(--color-success)]"
                                            : "border-b border-[var(--color-muted)] p-3 text-right font-medium text-[var(--color-danger)]"
                                    }
                                >
                                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                                </td>
                                {role === "admin" && (
                                    <td className='border-b border-[var(--color-muted)] p-3 text-right'>
                                        <button
                                            className='inline-flex h-8 w-8 translate-y-0.5 items-center justify-center rounded-xl text-[color-mix(in_srgb,var(--color-text)_60%,transparent)] opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[color-mix(in_srgb,var(--color-danger)_15%,transparent)] hover:text-[var(--color-danger)]'
                                            onClick={() =>
                                                dispatch(deleteTransaction(t.id))
                                            }
                                            aria-label='Delete transaction'
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                                                <path d="M4 7h16M10 11v6M14 11v6M7 7l1 12h8l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
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
                <div className="mt-5 flex flex-wrap gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`rounded-xl border px-3 py-1.5 transition duration-200 hover:-translate-y-px active:scale-[0.98]
          ${page === i
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] font-semibold text-white"
                                    : "border-[var(--color-muted)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-muted)_55%,transparent)]"}
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