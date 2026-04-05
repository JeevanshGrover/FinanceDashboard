import { configureStore } from "@reduxjs/toolkit";
import TransactionReducer from "./TransactionSlice.js"
import uiReducer from "./UiSlice.js"

export const store = configureStore({
    reducer: {
        transaction : TransactionReducer,
        ui : uiReducer
    }
})