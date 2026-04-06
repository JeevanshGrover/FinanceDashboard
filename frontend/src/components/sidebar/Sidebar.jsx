import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, toggleTheme } from '../../store/UiSlice.js';
import { setRole } from '../../store/UiSlice.js';

function Sidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isSidebarOpen)
  const role = useSelector((state) => state.ui.role)
  const theme = useSelector((state) => state.ui.theme)

  const toggleRole = () => {
    dispatch(setRole(role === "admin" ? "viewer" : "admin"))
  }
  return (
    <>
      {/* 🔲 Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* 📦 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          border-r border-[var(--color-muted)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(0,0,0,0.05)]
          transform transition-transform duration-300 ease-out
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          
          md:translate-x-0
        `}
      >
        <div className="flex h-full w-full flex-col justify-between p-5">

          {/* ❌ Close button (mobile only) */}
          <button
            className="mb-6 text-xl md:hidden transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
            onClick={() => dispatch(toggleSidebar())}
          >
            ✕
          </button>

          {/* 🔝 Top */}
          <div>
            <div className="mb-10 flex items-center gap-3 px-1">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)]"></div>
              <div>
                <h2 className="[font-family:var(--font-heading)] text-lg leading-none">Finlens</h2>
                <p className="mt-1 text-xs text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">Finance Dashboard</p>
              </div>
            </div>

            {/* 🔗 Navigation */}
            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-xl bg-[var(--color-muted)] px-3 py-2.5 font-medium text-[var(--color-primary)]"
                    : "rounded-xl px-3 py-2.5 text-[color-mix(in_srgb,var(--color-text)_85%,transparent)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--color-muted)_65%,transparent)]"
                }
                onClick={() => dispatch(toggleSidebar())} // auto close on mobile
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-xl bg-[var(--color-muted)] px-3 py-2.5 font-medium text-[var(--color-primary)]"
                    : "rounded-xl px-3 py-2.5 text-[color-mix(in_srgb,var(--color-text)_85%,transparent)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--color-muted)_65%,transparent)]"
                }
                onClick={() => dispatch(toggleSidebar())}
              >
                Transactions
              </NavLink>

              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-xl bg-[var(--color-muted)] px-3 py-2.5 font-medium text-[var(--color-primary)]"
                    : "rounded-xl px-3 py-2.5 text-[color-mix(in_srgb,var(--color-text)_85%,transparent)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--color-muted)_65%,transparent)]"
                }
                onClick={() => dispatch(toggleSidebar())}
              >
                Insights
              </NavLink>
            </nav>
          </div>

          {/* ⚙️ Bottom */}
          <div className="space-y-4 text-sm">
            <p className="text-[color-mix(in_srgb,var(--color-text)_70%,transparent)]">Settings</p>
            <button
              onClick={toggleRole}
              className={`w-full rounded-xl px-4 py-2.5 font-medium transition duration-200 hover:-translate-y-px active:scale-[0.98]
                ${role === "admin"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-muted)] text-[var(--color-text)]"
                }
              `}
            >
              {role === "admin" ? "Admin" : "Viewer"}
            </button>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="flex w-full items-center gap-2 rounded-xl border border-[var(--color-muted)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] transition duration-200 hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--color-muted)_45%,transparent)] active:scale-[0.98]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-muted)_70%,transparent)]">
                {theme === "dark" ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 2.8v2.2M12 19v2.2M21.2 12H19M5 12H2.8M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M20 14.3A8 8 0 1 1 9.7 4a7 7 0 1 0 10.3 10.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
