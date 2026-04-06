import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    type: "all",
    category: "all"
  },
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
    }
  }
});

export const { setFilter, setRole, toggleSidebar, toggleModal } = uiSlice.actions;
export default uiSlice.reducer;