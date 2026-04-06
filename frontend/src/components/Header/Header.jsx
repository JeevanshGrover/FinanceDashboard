import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar, toggleModal } from "../../store/UiSlice.js";

function Header() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/transactions") return "Transactions";
    if (location.pathname === "/insights") return "Insights";
    return "Dashboard";
  };

  const dispatch = useDispatch();
  const role = useSelector((state) => state.ui.role)
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-muted)] bg-[color-mix(in_srgb,var(--color-surface)_95%,transparent)] px-6 py-4 backdrop-blur-sm">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-2xl transition-transform duration-200 hover:-translate-y-px active:scale-[0.98] md:hidden"
        >
          ☰
        </button>

        <div>
          <h1 className="text-2xl [font-family:var(--font-heading)]">{getTitle()}</h1>
          <p className="text-xs text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[var(--color-muted)] px-3 py-1 text-sm capitalize text-[var(--color-text)]">
          {role}
        </span>

        <div className="flex w-[100px] justify-end">
          {role === "admin" && (
            <button
              onClick={() => dispatch(toggleModal(true))}
              className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-2 text-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-px hover:brightness-95 active:scale-[0.98]"
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;