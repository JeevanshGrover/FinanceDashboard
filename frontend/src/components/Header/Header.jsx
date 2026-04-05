import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/UiSlice.js";

function Header({ title = "Overview" }) {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dispatch = useDispatch();
  const role = useSelector((state) => state.ui.role)
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        
        {/* Burger (mobile only) */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="sm:hidden text-2xl"
        >
          ☰
        </button>

        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        
        <span className="bg-gray-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {role}
        </span>

        {role === "admin" && (
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            + Add
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;