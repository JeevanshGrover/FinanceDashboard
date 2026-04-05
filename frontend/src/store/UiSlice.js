import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filters: {
        type: 'all',
        category: 'all'
    },
    role: 'viewer'
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            if (action.payload.type !== undefined) {
                state.filters.type = action.payload.type
            }
            if (action.payload.category !== undefined) {
                state.filters.category = action.payload.category
            }
        },

        setRole: (state, action) => {
            const allowedRoles = ['viewer', 'admin']
            if (allowedRoles.includes(action.payload)) {
                state.role = action.payload
            }
        },
    }
})

export const { setFilter, setRole } = uiSlice.actions
export default uiSlice.reducer
    