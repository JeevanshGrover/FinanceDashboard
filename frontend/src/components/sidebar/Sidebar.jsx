import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from '../../store/UiSlice.js';
import { setRole } from '../../store/UiSlice.js';

function Sidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isSidebarOpen)
  const role = useSelector((state) => state.ui.role)

  const toggleRole = () => {
    dispatch(setRole(role === "admin" ? "viewer" : "admin"))
  }
  return (
    <>
      {/* 🔲 Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* 📦 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-100 z-50
          transform transition-transform duration-300
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          
          sm:translate-x-0 sm:static sm:flex
        `}
      >
        <div className="flex flex-col justify-between p-6 w-full">

          {/* ❌ Close button (mobile only) */}
          <button
            className="sm:hidden mb-6 text-xl"
            onClick={() => dispatch(toggleSidebar())}
          >
            ✕
          </button>

          {/* 🔝 Top */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-green-700 rounded-lg"></div>
              <div>
                <h2 className="font-semibold">Finlens</h2>
                <p className="text-xs text-gray-500">Finance Dashboard</p>
              </div>
            </div>

            {/* 🔗 Navigation */}
            <nav className="flex flex-col gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-medium"
                    : "text-gray-700"
                }
                onClick={() => dispatch(toggleSidebar())} // auto close on mobile
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-medium"
                    : "text-gray-700"
                }
                onClick={() => dispatch(toggleSidebar())}
              >
                Transactions
              </NavLink>

              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-medium"
                    : "text-gray-700"
                }
                onClick={() => dispatch(toggleSidebar())}
              >
                Insights
              </NavLink>
            </nav>
          </div>

          {/* ⚙️ Bottom */}
          <div className="text-sm text-gray-500">
            <p>Settings</p>
            <button
              onClick={toggleRole}
              className={`px-4 py-2 rounded text-white font-medium transition 
                ${role === "admin"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 hover:bg-gray-600"
                }
              `}
            >
              {role === "admin" ? "Admin" : "Viewer"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
