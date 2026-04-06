import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar, toggleModal } from "../../store/UiSlice.js";

function Header({ title = "Overview" }) {
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
    <div className="flex justify-between items-center px-6 py-4 bg-white border-b">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="sm:hidden text-2xl"
        >
          ☰
        </button>

        <h1 className="text-2xl font-semibold">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-gray-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {role}
        </span>

        <div className="w-[90px] flex justify-end">
          {role === "admin" && (
            <button
              onClick={() => dispatch(toggleModal(true))}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full"
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