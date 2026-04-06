import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
};

const initialState = {
  filters: {
    type: "all",
    category: "all"
  },
  theme: getInitialTheme(),
  role: "viewer",
  isSidebarOpen: false,
  modalOpen: false
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { type, category } = action.payload;

      if (type !== undefined) state.filters.type = type;
      if (category !== undefined) state.filters.category = category;
    },

    setRole: (state, action) => {
      const allowedRoles = ["viewer", "admin"];
      if (allowedRoles.includes(action.payload)) {
        state.role = action.payload;
      }
    },

    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    toggleModal: (state, action) => {
      state.modalOpen = action.payload
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    }
  }
});

export const { setFilter, setRole, toggleSidebar, toggleModal, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;