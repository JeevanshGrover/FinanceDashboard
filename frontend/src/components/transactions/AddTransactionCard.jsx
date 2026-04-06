import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../store/TransactionSlice.js";
import { toggleModal } from "../../store/UiSlice.js";

function AddTransactionCard() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  // 🔹 Unique categories for suggestions
  const categories = [...new Set(transactions.map((t) => t.category))];

  const [form, setForm] = useState({
    note: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");

  if (!modalOpen) return null;

  const close = () => dispatch(toggleModal(false));

  const handleSubmit = () => {
    if (!form.note) return setError("Description is required");
    if (!form.amount) return setError("Amount is required");
    if (!form.category) return setError("Category is required");

    setError("");

    dispatch(
      addTransaction({
        ...form,
        amount: parseFloat(form.amount),
        category: form.category.trim(),
      })
    );

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">New Transaction</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Description */}
          <input
            placeholder="Description"
            value={form.note}
            onChange={(e) => {
              setForm({ ...form, note: e.target.value });
              setError("");
            }}
            className={`border p-2 rounded ${
              error && !form.note ? "border-red-500" : ""
            }`}
          />

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => {
              setForm({ ...form, amount: e.target.value });
              setError("");
            }}
            className={`border p-2 rounded ${
              error && !form.amount ? "border-red-500" : ""
            }`}
          />

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="border p-2 rounded"
          />

          {/* Category with suggestions */}
          <input
            list="categories"
            placeholder="Category (e.g. Food, Travel)"
            value={form.category}
            onChange={(e) => {
              setForm({ ...form, category: e.target.value });
              setError("");
            }}
            className={`border p-2 rounded ${
              error && !form.category ? "border-red-500" : ""
            }`}
          />

          <datalist id="categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>

          {/* Type Toggle */}
          <div className="flex gap-2">
            {["income", "expense"].map((t) => (
              <button
                key={t}
                onClick={() =>
                  setForm({ ...form, type: t })
                }
                className={`flex-1 border p-2 rounded transition ${
                  form.type === t
                    ? "bg-purple-600 text-white font-semibold"
                    : "bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded transition"
          >
            Add Transaction
          </button>

        </div>
      </div>
    </div>
  );
}

export default AddTransactionCard;