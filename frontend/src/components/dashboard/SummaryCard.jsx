function SummaryCard({ title, value, type = "default" }) {
  const styles = {
    income: {
      text: "text-[var(--color-success)]"
    },
    expense: {
      text: "text-[var(--color-danger)]"
    },
    balance: {
      text: "text-[var(--color-text)]"
    },
    default: {
      text: "text-[var(--color-text)]"
    }
  };

  const current = styles[type];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-muted)] bg-[var(--color-surface)] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px">
      
      {/* Title */}
      <p className="text-xs uppercase tracking-wide text-[color-mix(in_srgb,var(--color-text)_60%,transparent)]">
        {title}
      </p>

      {/* Value */}
      <h3 className={`text-2xl font-semibold mt-2 ${current.text}`}>
        ₹{value}
      </h3>

    </div>
  );
}

export default SummaryCard;